# Portfólio profissional — Mikael Ribeiro

Portfólio profissional responsivo desenvolvido para apresentar minha trajetória como Desenvolvedor de Software, com foco em Java, Spring Boot, Angular e desenvolvimento Full Stack.

O projeto reúne minha experiência profissional, formação acadêmica, tecnologias, certificados, projetos e canais de contato em uma interface moderna, responsiva e com suporte aos idiomas português e inglês.

## Funcionalidades

- Página única com navegação suave entre as seções;
- Interface responsiva para desktop, tablet e mobile;
- Tema escuro com azul elétrico e violeta;
- Navbar fixa com menu mobile;
- Alternância de idioma entre português e inglês;
- Idioma inicial baseado no navegador;
- Preferência de idioma salva no `localStorage`;
- Globo interativo de tecnologias desenvolvido com Three.js;
- Logos de tecnologias com rotação, arraste, inércia e identificação no hover;
- Seção de projetos em manutenção;
- Carrossel de certificados com imagens reais;
- Informações sobre cursos e datas de conclusão;
- Linha do tempo de formação acadêmica e experiências profissionais;
- Links para GitHub, LinkedIn, e-mail e telefone;
- Formulário de contato preparado para integração com EmailJS;
- Aviso de manutenção no envio de mensagens.

## Tecnologias utilizadas

- Angular 22;
- TypeScript em modo strict;
- Standalone Components;
- Angular Signals;
- Angular Control Flow (`@if` e `@for`);
- SCSS;
- Three.js;
- Transloco;
- Material Symbols;
- RxJS;
- Vitest.

## Estrutura do projeto

```text
src/
└── app/
    ├── core/
    │   ├── loaders/
    │   └── services/
    ├── features/
    │   ├── about/
    │   ├── contact/
    │   ├── home/
    │   └── portfolio/
    ├── layouts/
    │   └── navbar/
    └── shared/
        └── components/
            └── skills-globe/

public/
├── certificates/
├── documents/
├── flags/
├── icons/
├── i18n/
└── skills/
