# Modelo Arquitectónico Formal — HUB SPORT / MATCHMAKING / PDGD

## 1) MODELO DE DOMINIO
- **Equipo**
  - `team_id`, `event_id`, `name`, `branch_id`, `category_id`, `skill_level` (opcional), `status` (`pre`/`ins`), `source` (`ui`/`import`), `created_at`
- **Categoría**
  - `category_id`, `event_id`, `name_display` (ej. `Preparatoria Femenil`), `branch_id`, `active`
- **Rama**
  - `branch_id`, `code` (`femenil|varonil|mixto`), `label`
- **Evento**
  - `event_id`, `alias`, `name`, `active`, `timezone`, `start_date`, `end_date`
- **Disponibilidad**
  - `availability_id`, `team_id`, `event_id`, `day_of_week`, `start_time`, `end_time`, `priority`
- **Restricción**
  - `constraint_id`, `team_id`, `event_id`, `type` (`no_hora`, `no_cancha`, `no_rival`, `distancia`, `descanso_min`), `value`
- **Slot (cancha/horario)**
  - `slot_id`, `event_id`, `venue`, `court`, `date`, `start_time`, `end_time`, `capacity`, `active`
- **Partido (programado)**
  - `match_id`, `event_id`, `category_id`, `team_a_id`, `team_b_id`, `slot_id`, `status` (`proposed|confirmed|live|finished|cancelled`)
- **Match (resultado de motor)**
  - `proposal_id`, `event_id`, `team_a_id`, `team_b_id`, `score_fit`, `reasoning`, `expires_at`

## 2) FLUJO TRANSACCIONAL
1. Captura directa en UI (sin Google Forms): equipo, categoría (rama+categoría), disponibilidad, restricciones.
2. Worker valida reglas de dominio (evento activo, categoría válida, disponibilidad consistente).
3. Persistencia transaccional en D1:
   - upsert de equipo
   - insert de disponibilidad/restricciones
   - evento de dominio `team_registered`.
4. Equipo entra a `pool_matchmaking` por evento+categoría.
5. Motor consume pool, evalúa compatibilidad y genera propuestas.
6. Publicación:
   - propuesta visible en Hub Sport
   - al confirmar, se asigna `slot` y se crea `match`.
7. Centro en vivo consume `match confirmed/live` y actualiza estado operativo.

## 3) MOTOR DE MATCHMAKING
- **Tipo recomendado**: híbrido
  - **push reactivo** al registrar/actualizar equipo
  - **pull batch** periódico para reconciliación y huecos
- **Inputs**
  - `event_id`, `category_id`, `branch`, disponibilidad, restricciones, historial básico (evitar repetición rival)
- **Reglas duras (hard constraints)**
  - misma categoría completa (`rama + categoría`)
  - intersección de horario válida
  - evento activo
  - restricciones bloqueantes cumplidas
- **Reglas blandas (scoring)**
  - minimizar conflictos de cancha/hora
  - balancear carga horaria
  - maximizar rapidez de cierre de match
- **Output**
  - `proposal` con `team_a`, `team_b`, `slot` candidato, `score_fit`, trazabilidad de reglas
- **Estrategia**
  - cola por `event_id + category_id`
  - locking optimista por versión de pool para evitar doble asignación
  - expiración de propuesta y reintento automático

## 4) ARQUITECTURA (C4 simplificado)
- **Nivel 1 — Contexto**
  - Usuario (coach/admin)
  - Hub Sport (UI de captura + visualización)
  - Matchmaking Engine (decisión)
  - D1 (estado transaccional)
- **Nivel 2 — Contenedores**
  - Frontend estático (GitHub Pages): activación UX, sin lógica crítica
  - Cloudflare Worker:
    - API de registro
    - API de catálogo/eventos
    - Orquestación matchmaking
    - Publicación de estado
  - Cloudflare D1:
    - persistencia de dominio
    - historial y auditoría mínima
- **Nivel 3 — Componentes (Worker)**
  - `RegistrationModule` (equipos/disponibilidad/restricciones)
  - `CatalogModule` (eventos/categorías/ramas/slots)
  - `MatchmakingModule` (pool, scoring, proposals, confirmación)
  - `LiveOpsModule` (estado de partido en vivo)
  - `PresenceModule` (PCL actual, desacoplado del core deportivo)
- **Puertos/Adaptadores**
  - Puertos: `TeamRepository`, `MatchRepository`, `SlotRepository`, `MatchmakingPort`
  - Adaptadores: D1 adapter, HTTP API adapter, UI adapter

## 5) ROADMAP EVOLUTIVO
- **v2.0**
  - eliminar Google Forms
  - captura directa UI → Worker → D1
  - catálogo de evento/categoría/rama/slots en D1
  - auditoría básica y validaciones transaccionales
- **v3.0**
  - motor matchmaking activo (push + batch pull)
  - propuestas automáticas + confirmación
  - asignación automática de slot con reglas
- **v4.0**
  - Centro de Partido en Vivo
  - estado en tiempo real (`confirmed/live/finished`)
  - tablero operativo unificado (registro + matchmaking + live)

## 6) DIFERENCIAL PDGD
- **PDGD sí hace**:
  - transaccionalidad end-to-end (captura→decisión→publicación)
  - motor de matchmaking nativo por reglas deportivas
  - operación en vivo integrada al mismo ciclo de datos
  - arquitectura por dominios (no solo CMS/app informativa)
- **Clupik típicamente no cubre completo**:
  - no centra el producto en motor de emparejamiento automatizado
  - menor foco en orquestación transaccional en tiempo real
  - menos integración nativa entre registro, asignación y live ops en un solo flujo

## 7) MODELO DE DATOS
- **events**
  - `event_id`, `alias` (unique), `name`, `active`, `timezone`, `start_date`, `end_date`
- **branches**
  - `branch_id`, `code`, `label`
- **categories**
  - `category_id`, `event_id`, `branch_id`, `name_display`, `active`, `sort_order`
- **teams**
  - `team_id`, `event_id`, `name`, `branch_id`, `category_id`, `status`, `skill_level`, `created_at`, `updated_at`
- **availability**
  - `availability_id`, `team_id`, `event_id`, `day_of_week`, `start_time`, `end_time`, `priority`
- **constraints**
  - `constraint_id`, `team_id`, `event_id`, `type`, `value`, `active`
- **slots**
  - `slot_id`, `event_id`, `venue`, `court`, `date`, `start_time`, `end_time`, `capacity`, `active`
- **match_proposals**
  - `proposal_id`, `event_id`, `category_id`, `team_a_id`, `team_b_id`, `slot_id`, `score_fit`, `status`, `created_at`, `expires_at`
- **matches**
  - `match_id`, `event_id`, `category_id`, `team_a_id`, `team_b_id`, `slot_id`, `status`, `confirmed_at`, `started_at`, `finished_at`
- **domain_events** (auditoría ligera)
  - `id`, `event_id`, `entity_type`, `entity_id`, `event_name`, `payload_json`, `created_at`
