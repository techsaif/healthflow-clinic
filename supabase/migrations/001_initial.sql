create extension if not exists "pgcrypto";
create type public.appointment_status as enum ('booked','arrived','completed','cancelled','no_show');
create type public.queue_status as enum ('arrived','waiting','consultation','completed','no_show');
create type public.doctor_status as enum ('available','delayed','emergency','unavailable');

create table public.doctors (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, role text not null, bio text not null, image_url text, status doctor_status not null default 'available', delay_minutes integer not null default 0, created_at timestamptz not null default now());
create table public.services (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, description text not null, created_at timestamptz not null default now());
create table public.appointments (id uuid primary key default gen_random_uuid(), appointment_number bigint generated always as identity unique, patient_id uuid references auth.users(id) on delete set null, patient_name text not null, phone text not null, email text not null, doctor_id uuid references public.doctors(id), service_slug text not null, appointment_date date not null, appointment_time time not null, status appointment_status not null default 'booked', created_at timestamptz not null default now());
create table public.queue_items (id uuid primary key default gen_random_uuid(), appointment_id uuid unique not null references public.appointments(id) on delete cascade, appointment_number bigint not null, doctor_id uuid references public.doctors(id), patient_name text not null, doctor_name text not null, service_name text not null, status queue_status not null default 'waiting', checked_in_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.clinic_settings (id boolean primary key default true, clinic_name text not null default 'HealthFlow Clinic', queue_paused boolean not null default false, updated_at timestamptz not null default now());

alter table public.doctors enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.queue_items enable row level security;
alter table public.clinic_settings enable row level security;
create policy "public can view doctors" on public.doctors for select using (true);
create policy "public can view services" on public.services for select using (true);
create policy "patients can view own appointments" on public.appointments for select using (auth.uid() = patient_id);
create policy "patients can create appointments" on public.appointments for insert with check (auth.uid() = patient_id or patient_id is null);
create policy "public can view active queue" on public.queue_items for select using (true);
create policy "public can view clinic settings" on public.clinic_settings for select using (true);

alter publication supabase_realtime add table public.queue_items;
alter publication supabase_realtime add table public.doctors;
create index appointments_date_idx on public.appointments(appointment_date, appointment_time);
create index queue_items_status_idx on public.queue_items(status, appointment_number);
