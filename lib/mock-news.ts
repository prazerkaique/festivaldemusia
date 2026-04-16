/* ─── News Data Layer ─── */

export interface NewsCategory {
  slug: string
  label: string
  color: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  thumbnail: string
  category: NewsCategory
  author: string
  date: string
  featured?: boolean
  body: string[]
  audioUrl?: string
  readingTime?: number
}

/* ─── Categories ─── */

export const NEWS_CATEGORIES: NewsCategory[] = [
  { slug: 'programacao', label: 'Programação', color: '#a71580' },
  { slug: 'concursos', label: 'Concursos', color: '#e9530d' },
  { slug: 'bastidores', label: 'Bastidores', color: '#00b4c5' },
  { slug: 'educacao', label: 'Educação Musical', color: '#facaab' },
]

const cat = Object.fromEntries(NEWS_CATEGORIES.map((c) => [c.slug, c]))

/* ─── Posts ─── */

export const POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'orquestra-sinfonica-confirma-presenca',
    title: 'Orquestra Sinfônica do Paraná confirma presença na edição 2026',
    excerpt:
      'A renomada Orquestra Sinfônica do Paraná será uma das atrações principais do Festival de Música de Maringá 2026, com apresentação no Teatro Calil Haddad.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0017.jpg',
    category: cat['programacao'],
    author: 'Equipe do Festival',
    date: '2026-03-28',
    featured: true,
    readingTime: 4,
    audioUrl: '/assets/audio/orquestra-placeholder.mp3',
    body: [
      'A Orquestra Sinfônica do Paraná confirmou oficialmente sua participação na edição 2026 do Festival de Música de Maringá. A apresentação acontecerá no Teatro Calil Haddad, com capacidade para mais de 1.200 pessoas, no dia 15 de outubro.',
      'Sob a regência do maestro Paulo Torres, o programa incluirá obras de Villa-Lobos, Carlos Gomes e composições inéditas de artistas paranaenses. A orquestra trará 68 músicos para a apresentação, que terá duração estimada de duas horas.',
      'Esta será a terceira vez que a Orquestra Sinfônica do Paraná se apresenta no festival. Em 2024, a performance foi considerada um dos pontos altos da edição, com lotação máxima e mais de 15 minutos de aplausos ao final do concerto.',
      '"Maringá tem um público extremamente receptivo à música clássica. É uma honra voltar a este palco", declarou o maestro Paulo Torres em entrevista exclusiva ao Festival.',
      'Os ingressos para a apresentação estarão disponíveis a partir de agosto, com desconto de 30% para estudantes e professores da rede pública. A organização recomenda antecedência na compra, já que a edição de 2024 esgotou em menos de uma semana.',
    ],
  },
  {
    id: '2',
    slug: 'inscricoes-concurso-musica-estudantil',
    title: 'Inscrições abertas para o Concurso de Música Estudantil',
    excerpt:
      'Estudantes de 12 a 18 anos já podem se inscrever no Concurso de Música Estudantil. Vagas limitadas para instrumentistas e cantores de toda a região.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0026.jpg',
    category: cat['concursos'],
    author: 'Coordenação de Concursos',
    date: '2026-03-25',
    readingTime: 3,
    body: [
      'O Festival de Música de Maringá anuncia a abertura das inscrições para o Concurso de Música Estudantil 2026. Voltado para jovens talentos entre 12 e 18 anos, o concurso aceita instrumentistas e cantores de qualquer gênero musical.',
      'As inscrições podem ser feitas pelo site oficial do festival até o dia 15 de agosto. Cada candidato deve enviar um vídeo de até 5 minutos demonstrando sua habilidade musical, além de uma carta de recomendação de um professor ou mentor.',
      'O concurso oferece 50 vagas no total, divididas entre as categorias instrumento solo, canto e conjunto. Os semifinalistas serão anunciados em setembro e se apresentarão ao vivo durante o festival, no dia 16 de outubro.',
      'Os três primeiros colocados de cada categoria receberão bolsas de estudo em conservatórios parceiros, além de instrumentos musicais e a oportunidade de se apresentar no palco principal do festival.',
    ],
  },
  {
    id: '3',
    slug: 'montagem-palco-principal-2025',
    title: 'Como foi a montagem do palco principal em 2025',
    excerpt:
      'Mais de 40 profissionais trabalharam durante 5 dias para montar a estrutura que recebeu milhares de espectadores. Veja os bastidores completos.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0045.jpg',
    category: cat['bastidores'],
    author: 'Produção',
    date: '2026-03-20',
    readingTime: 5,
    audioUrl: '/assets/audio/bastidores-placeholder.mp3',
    body: [
      'A montagem do palco principal do Festival de Música de Maringá é uma operação logística que envolve mais de 40 profissionais durante cinco dias consecutivos. Em 2025, a estrutura foi montada no Parque do Ingá e contou com novidades significativas.',
      'O palco principal teve suas dimensões ampliadas para 18 metros de boca de cena, com um sistema de iluminação composto por 240 refletores LED e um painel de vídeo de alta definição de 8 metros de largura. A cobertura tensionada foi projetada especificamente para otimizar a acústica ao ar livre.',
      'A equipe de som instalou um sistema line array com 48 caixas, garantindo distribuição uniforme para uma plateia estimada em até 5.000 pessoas. Os testes acústicos levaram um dia inteiro e envolveram músicos voluntários que simularam diferentes formações.',
      '"Cada edição é um desafio novo. O terreno do Parque do Ingá tem particularidades que exigem adaptação constante", explica Marcos Figueira, diretor técnico do festival desde 2019.',
      'Para 2026, a produção já antecipa mudanças: um segundo palco será instalado próximo ao lago, permitindo apresentações simultâneas e maior variedade na programação. A montagem deve começar dez dias antes do festival.',
      'A organização publicará um documentário curta-metragem sobre o processo de montagem, com estreia prevista para as redes sociais do festival em setembro.',
    ],
  },
  {
    id: '4',
    slug: 'oficinas-formacao-musical-educadores',
    title: 'Oficinas de formação musical para educadores',
    excerpt:
      'O Festival abre inscrições para oficinas gratuitas voltadas a professores da rede pública de Maringá e região. Capacitação em metodologias musicais.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0058.jpg',
    category: cat['educacao'],
    author: 'Núcleo Educacional',
    date: '2026-03-18',
    readingTime: 3,
    body: [
      'O Núcleo Educacional do Festival de Música de Maringá anuncia a abertura de inscrições para as oficinas de formação musical destinadas a educadores da rede pública. As oficinas são gratuitas e oferecem certificação de 40 horas.',
      'O programa abrange metodologias como Dalcroze, Orff e Kodály, adaptadas à realidade das escolas públicas brasileiras. Os encontros acontecerão entre os dias 13 e 17 de outubro, em paralelo à programação do festival.',
      'Cada oficina terá no máximo 25 participantes, garantindo acompanhamento individualizado. Os educadores receberão material didático completo e acesso a uma plataforma digital com recursos complementares para uso em sala de aula.',
      'Em 2025, as oficinas atenderam 150 professores de 32 municípios da região. Pesquisa de acompanhamento mostrou que 87% dos participantes implementaram as técnicas aprendidas em suas escolas no semestre seguinte.',
    ],
  },
  {
    id: '5',
    slug: 'pedro-emilio-confirmado-dia-14',
    title: 'Pedro Emílio é confirmado como atração do dia 14',
    excerpt:
      'O cantor e compositor Pedro Emílio, revelação da música brasileira, se apresenta no dia 14 de outubro no Parque do Ingá.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0104.jpg',
    category: cat['programacao'],
    author: 'Equipe do Festival',
    date: '2026-03-15',
    readingTime: 3,
    body: [
      'O cantor e compositor Pedro Emílio foi confirmado como uma das atrações do dia 14 de outubro no Festival de Música de Maringá 2026. A apresentação acontecerá no palco principal do Parque do Ingá, às 20h.',
      'Revelação da música brasileira nos últimos dois anos, Pedro Emílio acumula mais de 50 milhões de streams nas plataformas digitais. Seu álbum de estreia, "Raízes Urbanas", mistura MPB contemporânea com elementos de soul e jazz.',
      'O artista prepara um show especial para o festival, com participações de músicos locais. "Maringá sempre foi uma cidade musical para mim. Tocar no festival é realizar um sonho antigo", disse Pedro Emílio em suas redes sociais.',
      'A apresentação terá duração de aproximadamente 90 minutos e incluirá faixas do novo álbum, ainda sem data de lançamento, além dos sucessos já conhecidos do público.',
    ],
  },
  {
    id: '6',
    slug: 'hackathon-musical-tecnologia-arte',
    title: 'Hackathon Musical: tecnologia encontra arte',
    excerpt:
      'Desenvolvedores e músicos se unem em 48 horas de criação. O Hackathon Musical acontece em paralelo ao festival e premia as melhores soluções criativas.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0129.jpg',
    category: cat['concursos'],
    author: 'Coordenação de Concursos',
    date: '2026-03-12',
    readingTime: 4,
    body: [
      'O Hackathon Musical é uma das iniciativas mais inovadoras do Festival de Música de Maringá. Na edição 2026, desenvolvedores, designers e músicos terão 48 horas para criar soluções tecnológicas que conectem tecnologia e arte.',
      'O evento acontecerá nos dias 17 e 18 de outubro, no espaço de coworking do Maringá Tech Hub. As equipes, formadas por 3 a 5 pessoas, devem obrigatoriamente incluir pelo menos um músico e um desenvolvedor.',
      'Os desafios desta edição incluem: criação de ferramentas de composição assistida por IA, plataformas de ensino musical interativo, soluções de acessibilidade para espectadores com deficiência auditiva e aplicativos de conexão entre músicos locais.',
      'O primeiro colocado receberá R$ 15.000 em prêmios, mentoria de três meses com empresas do setor e a oportunidade de apresentar sua solução no palco principal do festival. Os segundo e terceiro lugares receberão R$ 8.000 e R$ 5.000, respectivamente.',
      'As inscrições estão abertas até 30 de setembro pelo site oficial. Não é necessário ter equipe formada — a organização promoverá um evento de formação de times uma semana antes do hackathon.',
    ],
  },
  {
    id: '7',
    slug: 'bastidores-apresentacao-aeroporto',
    title: 'Os bastidores da apresentação no aeroporto',
    excerpt:
      'Uma surpresa para os viajantes: músicos do festival se apresentaram no saguão do Aeroporto de Maringá. Confira como foi organizada essa ação especial.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0164.jpg',
    category: cat['bastidores'],
    author: 'Produção',
    date: '2026-03-10',
    readingTime: 4,
    body: [
      'Na manhã de 5 de março, viajantes que passavam pelo saguão do Aeroporto Regional de Maringá foram surpreendidos por uma apresentação musical inesperada. Seis músicos do Festival de Música de Maringá executaram um repertório de 30 minutos que parou o terminal.',
      'A ação foi planejada durante três semanas pela equipe de produção do festival. O objetivo era divulgar a edição 2026 e levar a música para além dos espaços tradicionais. A escolha do aeroporto não foi aleatória: é o ponto de entrada de visitantes de todo o Brasil.',
      'O repertório incluiu arranjos instrumentais de clássicos da MPB, com destaque para uma versão camerística de "Águas de Março" que emocionou os presentes. Os músicos se posicionaram entre os assentos da sala de embarque, criando uma experiência imersiva.',
      '"A reação das pessoas foi incrível. Muitos pararam para filmar, outros aplaudiram de pé. Uma senhora chorou. É disso que se trata: levar a música onde ela não é esperada", contou a produtora Ana Luíza Mendes.',
      'O vídeo da apresentação, publicado nas redes sociais do festival, alcançou mais de 200 mil visualizações em 48 horas e foi compartilhado por veículos de comunicação de todo o Paraná.',
    ],
  },
  {
    id: '8',
    slug: 'chamada-novos-apoiadores',
    title: 'Festival abre chamada para novos apoiadores',
    excerpt:
      'Empresas e instituições podem se tornar apoiadoras da edição 2026. Conheça os planos de patrocínio e as vantagens de associar sua marca ao festival.',
    thumbnail: '/assets/carrossel/sm_FESTMUSIC2025_0179.jpg',
    category: cat['programacao'],
    author: 'Equipe do Festival',
    date: '2026-03-08',
    readingTime: 3,
    body: [
      'O Festival de Música de Maringá abre oficialmente a chamada para empresas e instituições interessadas em apoiar a edição 2026. Com quatro planos de patrocínio disponíveis, a organização busca parceiros que compartilhem o compromisso com a cultura e a educação musical.',
      'Os planos variam de R$ 5.000 a R$ 50.000 e incluem benefícios como exposição de marca nos materiais do festival, ingressos VIP, espaço para ativações durante os eventos e menção em toda a comunicação oficial.',
      'Em 2025, o festival contou com 28 apoiadores, entre empresas locais, nacionais e instituições públicas. A meta para 2026 é alcançar 40 parceiros, ampliando tanto o alcance quanto a qualidade da programação oferecida.',
      'Interessados podem acessar o dossiê completo de patrocínio pelo site do festival ou entrar em contato diretamente com a equipe comercial pelo e-mail parcerias@festivalmaringa.com.br.',
    ],
  },
]

/* ─── Helpers ─── */

export function getPostsByCategory(slug: string | null): BlogPost[] {
  if (!slug) return POSTS
  return POSTS.filter((p) => p.category.slug === slug)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getAllNewsSlugs(): string[] {
  return POSTS.map((p) => p.slug)
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = POSTS.filter(
    (p) => p.category.slug === post.category.slug && p.id !== post.id
  )
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)
  const others = POSTS.filter(
    (p) => p.category.slug !== post.category.slug && p.id !== post.id
  )
  return [...sameCategory, ...others].slice(0, limit)
}

export function formatPostDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
