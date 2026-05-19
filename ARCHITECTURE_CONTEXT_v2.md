# Hub Sport — Contexto Maestro v2

## 1. Visión del Sistema
Hub Sport evoluciona de una interfaz de visualización (v1.0) a una plataforma transaccional operativa para gestión deportiva por evento. El objetivo de arquitectura es un flujo único y gobernado de punta a punta:

`captura -> validación -> persistencia -> matchmaking -> publicación -> operación en vivo`

La plataforma se estructura por dominios funcionales:
- Hub Sport (captación y experiencia de usuario)
- Matchmaking (decisión y asignación de partidos)
- Centro de Partido en Vivo (operación de evento en tiempo real)

Alcance productivo:
- Mantener separación estricta entre DEMO y REAL.
- Consolidar REAL como fuente transaccional sobre Worker + D1.
- Desacoplar definitivamente captura operativa de Google Forms.

## 2. Modelo Transaccional
### 2.1 Flujo definitivo
1. Usuario registra equipo en UI.
2. UI envía payload al Worker (API transaccional).
3. Worker valida reglas de dominio y estado del evento.
4. Worker ejecuta transacción en D1 (upsert/insert controlado tipo PCL).
5. Worker publica evento de dominio para cola/pool de matchmaking.
6. Matchmaking genera propuesta y/o partido programado.
7. UI consume estado actualizado para render y operación.

### 2.2 Entidades transaccionales mínimas
- Equipo
- Evento
- Categoría (siempre rama + categoría)
- Disponibilidad
- Restricción
- Slot (cancha/horario)
- MatchProposal / Partido

### 2.3 Eventos de dominio
- `team_registered`
- `team_updated`
- `team_availability_updated`
- `team_constraints_updated`
- `team_ready_for_matchmaking`
- `match_proposed`
- `match_confirmed`
- `match_scheduled`
- `match_live`
- `match_finished`

### 2.4 Transacciones tipo PCL
Patrón obligatorio en operaciones críticas:
- Validar estado de evento (`event_active`)
- Insert/Update con clave de identidad estable
- `ON CONFLICT` explícito para evitar duplicación
- Auditoría mínima (`created_at`, `updated_at`, origen)

### 2.5 Entradas / Salidas
Entradas API:
- `POST /teams/register`
- `POST /teams/{id}/availability`
- `POST /teams/{id}/constraints`
- `POST /matchmaking/run` (manual/operativo)

Salidas API:
- `GET /events/{alias}/teams`
- `GET /events/{alias}/pool`
- `GET /events/{alias}/matches`
- `GET /events/{alias}/live`

## 3. Motor de Matchmaking
### 3.1 Inputs
- `event_id`
- `team_id`
- `category_id` (rama + categoría)
- disponibilidad horaria
- restricciones
- nivel competitivo (si aplica)
- estado de confirmación de equipo

### 3.2 Reglas de compatibilidad
Reglas duras:
- Misma categoría completa (sin simplificar rama)
- Solapamiento real de disponibilidad
- Restricciones bloqueantes cumplidas
- Evento activo y slot válido

Reglas blandas:
- Minimizar conflicto de horario/cancha
- Balancear carga por equipo
- Evitar repeticiones tempranas de rivales
- Maximizar tasa de cierre de propuestas

### 3.3 Estrategia de ejecución
Modelo híbrido:
- Event-driven (disparo inmediato al registrar/actualizar equipo)
- Batch de reconciliación (intervalo fijo para pendientes)

### 3.4 Manejo de conflictos
- Lock lógico por `event_id + category_id` durante ciclo de asignación.
- Versionado de pool para evitar doble propuesta.
- Expiración de propuesta y reintento automático.

### 3.5 Generación progresiva de rol
- Fase 1: propuesta inicial de enfrentamientos viables.
- Fase 2: asignación de slots respetando conflictos.
- Fase 3: confirmación operativa y publicación.

## 4. Diferencial PDGD vs Clupik
> Consolidado final comercial y técnico (orientado a venta institucional y ejecución).

### 4.1 Captación
PDGD sí:
- Activación rápida por evento con despliegue ligero.
- Onboarding operativo por torneo/liga con foco en ejecución inmediata.

Clupik no (en este enfoque):
- No centra su propuesta en arranque ultrarrápido orientado a evento transaccional por edición.

### 4.2 Operación
PDGD sí:
- Flujo integrado evento: registro -> asignación -> partido -> operación en sede.
- Modelo plataforma + servicio (acompañamiento operativo, no solo licencia).

Clupik no (en este enfoque):
- Predomina modelo de gestión de club/membresía; menor foco en operación táctica de torneo en campo.

### 4.3 Inteligencia
PDGD sí:
- Motor de matchmaking como núcleo de decisión.
- Priorización por compatibilidad real y minimización de conflictos.

Clupik no (en este enfoque):
- No posiciona matchmaking inteligente como núcleo operativo principal.

### 4.4 Tiempo real
PDGD sí:
- Centro de Partido en Vivo (anterior/actual/siguiente + mensajes + LIVE/ON-DEMAND con aprobación).
- Gobernanza editorial para publicación segura en vivo.

Clupik no (en este enfoque):
- No orientado a centro operativo de sede con lógica dual scoreboard/community y flujo editorial LIVE.

### 4.5 Monetización
PDGD sí:
- Monetización por operación de evento, patrocinio contextual, servicios premium por edición.
- Escalado por paquetes (accesible, medio, institucional) con componente de servicio.

Clupik no (en este enfoque):
- Monetización centrada en suscripción/módulos de gestión general; menor flexibilidad en operación por evento tipo “llave en mano”.

## 5. Centro de Partido en Vivo (Integración)
### 5.1 Dependencias
- Partidos confirmados/programados por matchmaking.
- Estado de partido (`scheduled`, `live`, `finished`).
- Mensajería contextual (`PREMIUM`, `PLUS`).
- Capa LIVE/ON-DEMAND con aprobación editorial.

### 5.2 Triggers
- `match_confirmed`: habilita tarjeta de próximo.
- `match_live`: activa tarjeta central y marcador en vivo.
- `match_finished`: mueve partido a historial/anterior.
- `live_stream_approved`: publica acceso LIVE/ON-DEMAND.

### 5.3 Flujo de actualización
1. Operador actualiza estado/score.
2. Worker persiste y emite evento.
3. UI live refresca (polling corto o canal tiempo real según fase).
4. Render cambia layout y prioridades visuales sin redeploy.

### 5.4 Regla editorial crítica
Mostrar tarjeta LIVE/ON-DEMAND solo si:
- `live_url` presente
- `live_approved = SI`
- `live_status in (LIVE, ON-DEMAND)`

## 6. Modelo de Datos (D1)
### 6.1 Tablas principales
- `events`
- `branches`
- `categories`
- `teams`
- `team_availability`
- `team_constraints`
- `slots`
- `matchmaking_pool`
- `match_proposals`
- `matches`
- `live_messages`
- `live_streams`
- `domain_events`

### 6.2 Relaciones clave
- `events` 1:N `categories`, `teams`, `slots`, `matches`
- `categories` 1:N `teams`, `matches`
- `teams` 1:N `team_availability`, `team_constraints`
- `matches` N:1 `slots`
- `match_proposals` referencia dos equipos + categoría + evento

### 6.3 Claves y consistencia
- PK numérica/autoincremental o UUID estable por tabla.
- Unicidad recomendada:
  - `events.alias`
  - `categories (event_id, name_display)`
  - `teams (event_id, normalized_name, category_id)`
  - `matchmaking_pool (event_id, team_id)`
- Índices por `event_id`, `category_id`, `status`, `updated_at`.
- Campos críticos en tablas transaccionales:
  - `created_at`, `updated_at`, `source`, `version`.

## 7. Arquitectura General
### 7.1 Capas
UI (Frontend):
- Captura y visualización.
- Sin lógica crítica de negocio.

Worker (Lógica):
- Validación de dominio.
- Orquestación transaccional.
- Matchmaking.
- Publicación de estado live.

D1 (Persistencia):
- Fuente de verdad de REAL.
- Consistencia y auditoría.

Integraciones externas (opcionales):
- Google (solo transición/compatibilidad).
- Streaming externo vía URL (no host de video propio).

### 7.2 Flujo de datos
- Escritura: UI -> Worker -> D1
- Lectura: UI <- Worker <- D1
- Eventos internos: Worker -> `domain_events` -> módulos consumidores

### 7.3 Responsabilidades por capa
- UI: UX, estado de vista, accesibilidad, branding dinámico.
- Worker: reglas, seguridad, idempotencia, conflictos.
- D1: integridad relacional y performance de consulta.

## 8. Roadmap Evolutivo
### v2.0 — Transaccionalidad real
- Eliminar Google Forms del flujo operativo.
- Captura directa en UI + endpoints Worker.
- Persistencia base en D1 con transacciones e idempotencia.
- Catálogo por evento/categoría consolidado.

### v3.0 — Matchmaking operativo
- Activar motor híbrido (event-driven + batch).
- Propuestas y confirmación de partidos.
- Gestión de slots y resolución de conflictos.
- Métricas de calidad de emparejamiento.

### v4.0 — Centro de Partido en Vivo
- Estado de partido en tiempo real.
- Layout dual scoreboard/community.
- Mensajes PREMIUM/PLUS y LIVE/ON-DEMAND aprobado.
- Operación multi-sede y monitoreo central.

## 9. Principios de Diseño
- Determinismo: misma entrada -> mismo resultado funcional esperado.
- No duplicación: identidades únicas + `ON CONFLICT` explícito.
- Consistencia de datos: REAL siempre desde D1.
- Separación DEMO vs REAL: sin mezcla de fuentes.
- Separación dominio vs presentación: UI no decide reglas críticas.
- Escalabilidad incremental: por fases, sin refactor masivo disruptivo.
- Trazabilidad: toda operación relevante deja rastro en `domain_events`.
- Seguridad editorial en vivo: nada se publica sin regla de aprobación.
