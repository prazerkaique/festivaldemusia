/* ─── Contest Data Layer ─── */

export interface Prize {
  place: string
  amount: string
  description: string
}

export interface Criterion {
  text: string
}

export interface TimelineStep {
  date: string
  label: string
}

export interface ContestFormField {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'textarea'
  placeholder: string
  required: boolean
  options?: string[]
}

export interface Contest {
  slug: string
  title: string
  subtitle: string
  date: string
  time: string
  location: string
  color: 'purple' | 'orange' | 'cyan'
  status: 'aberto' | 'encerrado' | 'em-breve'
  image: string
  cardImage: string
  description: string
  prizes: Prize[]
  criteria: Criterion[]
  timeline: TimelineStep[]
  registrationUrl: string
  pdfUrl?: string
  formFields?: ContestFormField[]
}

/* ─── Color map ─── */

export const COLOR_MAP: Record<Contest['color'], { bg: string; text: string; badge: string; border: string; ring: string }> = {
  purple: {
    bg: 'bg-purple',
    text: 'text-purple',
    badge: 'bg-purple',
    border: 'border-purple',
    ring: 'ring-purple',
  },
  orange: {
    bg: 'bg-orange',
    text: 'text-orange',
    badge: 'bg-orange',
    border: 'border-orange',
    ring: 'ring-orange',
  },
  cyan: {
    bg: 'bg-cyan',
    text: 'text-cyan',
    badge: 'bg-cyan',
    border: 'border-cyan',
    ring: 'ring-cyan',
  },
}

export const COLOR_HEX: Record<Contest['color'], string> = {
  purple: '#a71580',
  orange: '#e9530d',
  cyan: '#00b4c5',
}

/* ─── Contests ─── */

export const CONTESTS: Contest[] = [
  {
    slug: 'musica-estudantil',
    title: 'Concurso de Música Estudantil',
    subtitle: 'O palco da próxima geração musical de Maringá',
    date: '15 de Outubro de 2026',
    time: '19h',
    location: 'Teatro Calil Haddad',
    color: 'purple',
    status: 'aberto',
    image: '/assets/concurso-estudantil.jpg',
    cardImage: '/assets/jovem.jpg',
    description:
      'O Concurso de Música Estudantil é uma das grandes vitrines do Festival de Música de Maringá. Voltado para estudantes de 14 a 25 anos, o concurso busca revelar novos talentos da cena musical local e regional. Os participantes podem se inscrever como solistas ou bandas de até 5 integrantes, apresentando composições autorais ou releituras criativas de obras consagradas. Um júri técnico composto por músicos profissionais e educadores musicais avalia criatividade, técnica, presença de palco e originalidade. Os finalistas se apresentam ao vivo no Teatro Calil Haddad para uma plateia de mais de 500 pessoas.',
    prizes: [
      { place: '1o Lugar', amount: 'R$ 3.000', description: 'Troféu + apresentação no palco principal do Mega Concert' },
      { place: '2o Lugar', amount: 'R$ 1.500', description: 'Troféu + gravação profissional de uma música em estúdio' },
      { place: '3o Lugar', amount: 'R$ 750', description: 'Troféu + kit de equipamentos musicais' },
    ],
    criteria: [
      { text: 'Ter entre 14 e 25 anos completos até a data do concurso' },
      { text: 'Estar regularmente matriculado em instituição de ensino' },
      { text: 'Inscrição individual ou banda de até 5 integrantes' },
      { text: 'Apresentar composição autoral ou releitura criativa (máx. 5 minutos)' },
      { text: 'Não ter contrato vigente com gravadora' },
      { text: 'Residir em Maringá ou região metropolitana' },
    ],
    timeline: [
      { date: '01/09/2026', label: 'Inscrições abrem' },
      { date: '30/09/2026', label: 'Encerramento das inscrições' },
      { date: '05/10/2026', label: 'Divulgação dos semifinalistas' },
      { date: '10/10/2026', label: 'Semifinal — Teatro Barracão' },
      { date: '15/10/2026', label: 'Final — Teatro Calil Haddad' },
    ],
    registrationUrl: '#',
    pdfUrl: '#',
    formFields: [
      { name: 'idade', label: 'Idade', type: 'number', placeholder: 'Ex: 18', required: true },
      { name: 'instrumento', label: 'Instrumento Principal', type: 'select', placeholder: 'Selecione o instrumento', required: true, options: ['Violão', 'Guitarra', 'Baixo', 'Bateria', 'Teclado/Piano', 'Violino', 'Flauta', 'Saxofone', 'Voz', 'Outro'] },
      { name: 'instituicao', label: 'Instituição de Ensino', type: 'text', placeholder: 'Nome da escola ou faculdade', required: true },
    ],
  },
  {
    slug: 'mega-concert',
    title: 'Mega Concert',
    subtitle: 'Milhares de vozes. Uma só canção.',
    date: '18 de Outubro de 2026',
    time: '18h',
    location: 'Estádio Willie Davids',
    color: 'orange',
    status: 'aberto',
    image: '/assets/rock.jpg',
    cardImage: '/assets/rock.jpg',
    description:
      'O Mega Concert é o grande encerramento do Festival de Música de Maringá — um espetáculo a céu aberto que reúne milhares de pessoas no Estádio Willie Davids para uma celebração musical coletiva. O evento convida corais, bandas, orquestras e artistas locais a se unirem em apresentações colaborativas inéditas. O objetivo é criar o maior concerto simultâneo já realizado na cidade, unindo músicos profissionais e amadores em um repertório que vai do clássico ao pop, passando pelo sertanejo e MPB. Bandas e grupos musicais podem se inscrever para participar das apresentações coletivas e concorrer ao prêmio de Melhor Performance Coletiva.',
    prizes: [
      { place: '1o Lugar', amount: 'R$ 5.000', description: 'Troféu + contrato para apresentação no festival 2027' },
      { place: '2o Lugar', amount: 'R$ 2.500', description: 'Troféu + produção de videoclipe profissional' },
      { place: '3o Lugar', amount: 'R$ 1.000', description: 'Troféu + sessão de fotos profissional para a banda' },
    ],
    criteria: [
      { text: 'Grupos musicais de 3 a 20 integrantes' },
      { text: 'Repertório colaborativo — pelo menos 2 músicas do setlist oficial' },
      { text: 'Ensaio obrigatório no dia 17/10 (passagem de som)' },
      { text: 'Equipamentos básicos fornecidos pela organização' },
      { text: 'Apresentação de 15 a 20 minutos' },
      { text: 'Aberto a grupos de qualquer cidade do Paraná' },
    ],
    timeline: [
      { date: '15/08/2026', label: 'Inscrições abrem' },
      { date: '15/09/2026', label: 'Encerramento das inscrições' },
      { date: '25/09/2026', label: 'Divulgação dos grupos selecionados' },
      { date: '10/10/2026', label: 'Envio do setlist oficial' },
      { date: '17/10/2026', label: 'Ensaio geral — Estádio Willie Davids' },
      { date: '18/10/2026', label: 'Mega Concert — Apresentação' },
    ],
    registrationUrl: '#',
    pdfUrl: '#',
    formFields: [
      { name: 'nomeGrupo', label: 'Nome do Grupo/Banda', type: 'text', placeholder: 'Ex: Os Maringaenses', required: true },
      { name: 'qtdIntegrantes', label: 'Quantidade de Integrantes', type: 'number', placeholder: 'Ex: 5', required: true },
      { name: 'generoMusical', label: 'Gênero Musical', type: 'select', placeholder: 'Selecione o gênero', required: true, options: ['MPB', 'Sertanejo', 'Rock', 'Pop', 'Jazz', 'Clássico', 'Gospel', 'Forró', 'Reggae', 'Outro'] },
    ],
  },
  {
    slug: 'hackathon',
    title: 'Hackathon Musical',
    subtitle: 'Tecnologia e música se encontram em 48 horas de inovação',
    date: '16 de Outubro de 2026',
    time: '9h',
    location: 'UEM — Universidade Estadual de Maringá',
    color: 'cyan',
    status: 'aberto',
    image: '/assets/hackathon.jpg',
    cardImage: '/assets/raka.jpg',
    description:
      'O Hackathon Musical é uma maratona criativa de 48 horas que une tecnologia e música. Equipes de 3 a 5 pessoas desenvolvem soluções inovadoras para desafios reais do cenário musical — desde apps de educação musical e plataformas de distribuição até instrumentos digitais e ferramentas de acessibilidade sonora. Organizado em parceria com a UEM e empresas de tecnologia de Maringá, o hackathon recebe mentoria de profissionais da indústria musical e do ecossistema tech. O evento acontece no campus da UEM, com alimentação, internet e infraestrutura fornecidas pela organização.',
    prizes: [
      { place: '1o Lugar', amount: 'R$ 10.000', description: 'Prêmio em dinheiro + incubação no Maringá Tech Hub' },
      { place: '2o Lugar', amount: 'R$ 5.000', description: 'Prêmio em dinheiro + mentorias com profissionais da indústria' },
      { place: '3o Lugar', amount: 'R$ 2.500', description: 'Prêmio em dinheiro + licenças de software' },
    ],
    criteria: [
      { text: 'Equipes de 3 a 5 pessoas' },
      { text: 'Pelo menos 1 integrante com experiência musical (formal ou informal)' },
      { text: 'Solução deve estar relacionada ao universo musical' },
      { text: 'Protótipo funcional ao final das 48 horas' },
      { text: 'Apresentação de pitch de 5 minutos para banca avaliadora' },
      { text: 'Aberto a maiores de 16 anos de qualquer localidade' },
    ],
    timeline: [
      { date: '01/09/2026', label: 'Inscrições abrem' },
      { date: '05/10/2026', label: 'Encerramento das inscrições' },
      { date: '08/10/2026', label: 'Divulgação das equipes selecionadas' },
      { date: '16/10/2026', label: 'Início do Hackathon — 9h' },
      { date: '18/10/2026', label: 'Apresentação dos projetos e premiação' },
    ],
    registrationUrl: '#',
    pdfUrl: '#',
    formFields: [
      { name: 'nomeEquipe', label: 'Nome da Equipe', type: 'text', placeholder: 'Ex: Equipe Sonora', required: true },
      { name: 'qtdIntegrantes', label: 'Quantidade de Integrantes', type: 'number', placeholder: 'Ex: 4', required: true },
      { name: 'areaAtuacao', label: 'Área de Atuação', type: 'select', placeholder: 'Selecione a área', required: true, options: ['Desenvolvimento de Software', 'Design/UX', 'Produção Musical', 'Educação Musical', 'Inteligência Artificial', 'Hardware/IoT', 'Outro'] },
    ],
  },
]

/* ─── Helpers ─── */

export function getContestBySlug(slug: string): Contest | undefined {
  return CONTESTS.find((c) => c.slug === slug)
}

export function getAllContestSlugs(): string[] {
  return CONTESTS.map((c) => c.slug)
}

export function getTotalPrize(contest: Contest): string {
  const total = contest.prizes.reduce((acc, p) => {
    const num = parseFloat(p.amount.replace(/[^\d.,]/g, '').replace('.', '').replace(',', '.'))
    return acc + num
  }, 0)
  return `R$ ${total.toLocaleString('pt-BR')}`
}

export function getStatusLabel(status: Contest['status']): string {
  const labels: Record<Contest['status'], string> = {
    aberto: 'Inscrições Abertas',
    encerrado: 'Encerrado',
    'em-breve': 'Em Breve',
  }
  return labels[status]
}

export function getStatusColor(status: Contest['status']): string {
  const colors: Record<Contest['status'], string> = {
    aberto: 'bg-green-500',
    encerrado: 'bg-red-500',
    'em-breve': 'bg-gray-500',
  }
  return colors[status]
}
