import { getPayload } from 'payload'
import configPromise from '@payload-config'

/* ─── Lexical rich text helper ─── */

function stringsToLexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        children: [
          {
            type: 'text',
            text,
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/* ─── Slug generator for events ─── */

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/* ─── Main seed function ─── */

export async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('Starting seed...')

  /* ─── 1. Admin user ─── */

  const existingUsers = await payload.find({ collection: 'users', limit: 1 })

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@admin.com',
        password: 'admin',
        name: 'Administrador',
        role: 'admin',
      },
    })
    console.log('  Created admin user')
  } else {
    console.log('  Admin user already exists — skipping')
  }

  /* ─── 2. Venues ─── */

  const venueIdMap: Record<string, number> = {}

  const existingVenues = await payload.find({ collection: 'venues', limit: 1 })

  if (existingVenues.totalDocs === 0) {
    const venuesData = [
      { key: 'marista', name: 'Teatro Marista', shortName: 'Teatro Marista', color: '#e9530d' },
      { key: 'aeroporto', name: 'Aeroporto de Maringá', shortName: 'Aeroporto', color: '#dc2626' },
      { key: 'prefeitura', name: 'Prefeitura de Maringá', shortName: 'Prefeitura', color: '#a71580' },
      { key: 'saude', name: 'Secretaria de Saúde', shortName: 'Sec. Saúde', color: '#16a34a' },
      { key: 'calil', name: 'Teatro Calil Haddad', shortName: 'Calil Haddad', color: '#7c3aed' },
      { key: 'luzamor', name: 'Teatro Luzamor', shortName: 'Teatro Luzamor', color: '#00b4c5' },
      { key: 'terminal', name: 'Terminal Urbano de Maringá', shortName: 'Terminal Urbano', color: '#d97706' },
      { key: 'barracao', name: 'Teatro Barracão', shortName: 'Teatro Barracão', color: '#2563eb' },
      { key: 'alvorada', name: 'Salão Comunitário Jardim Alvorada', shortName: 'Jd. Alvorada', color: '#059669' },
      { key: 'rodoviaria', name: 'Rodoviária de Maringá', shortName: 'Rodoviária', color: '#b45309' },
      { key: 'willie', name: 'Feira do Produtor — Estádio Willie Davids', shortName: 'Estádio Willie Davids', color: '#0891b2' },
      { key: 'inga', name: 'Parque do Ingá', shortName: 'Parque do Ingá', color: '#16a34a' },
      { key: 'jorge', name: 'Travessa Jorge Amado', shortName: 'Travessa Jorge Amado', color: '#e9530d' },
    ]

    for (const venue of venuesData) {
      const created = await payload.create({
        collection: 'venues',
        data: {
          name: venue.name,
          shortName: venue.shortName,
          color: venue.color,
        },
      })
      venueIdMap[venue.key] = created.id as number
      console.log(`  Created venue: ${venue.name}`)
    }
  } else {
    console.log('  Venues already exist — loading IDs')
    const allVenues = await payload.find({ collection: 'venues', limit: 100 })
    const keyMap: Record<string, string> = {
      'Teatro Marista': 'marista',
      'Aeroporto de Maringá': 'aeroporto',
      'Prefeitura de Maringá': 'prefeitura',
      'Secretaria de Saúde': 'saude',
      'Teatro Calil Haddad': 'calil',
      'Teatro Luzamor': 'luzamor',
      'Terminal Urbano de Maringá': 'terminal',
      'Teatro Barracão': 'barracao',
      'Salão Comunitário Jardim Alvorada': 'alvorada',
      'Rodoviária de Maringá': 'rodoviaria',
      'Feira do Produtor — Estádio Willie Davids': 'willie',
      'Parque do Ingá': 'inga',
      'Travessa Jorge Amado': 'jorge',
    }
    for (const venue of allVenues.docs) {
      const key = keyMap[venue.name as string]
      if (key) venueIdMap[key] = venue.id as number
    }
  }

  /* ─── 3. News categories ─── */

  const categoryIdMap: Record<string, number> = {}

  const existingCategories = await payload.find({ collection: 'news-categories', limit: 1 })

  if (existingCategories.totalDocs === 0) {
    const categoriesData = [
      { slug: 'programacao', title: 'Programação', color: '#a71580' },
      { slug: 'concursos', title: 'Concursos', color: '#e9530d' },
      { slug: 'bastidores', title: 'Bastidores', color: '#00b4c5' },
      { slug: 'educacao', title: 'Educação Musical', color: '#facaab' },
    ]

    for (const category of categoriesData) {
      const created = await payload.create({
        collection: 'news-categories',
        data: {
          title: category.title,
          slug: category.slug,
          color: category.color,
        },
      })
      categoryIdMap[category.slug] = created.id as number
      console.log(`  Created category: ${category.title}`)
    }
  } else {
    console.log('  News categories already exist — loading IDs')
    const allCategories = await payload.find({ collection: 'news-categories', limit: 100 })
    for (const category of allCategories.docs) {
      categoryIdMap[category.slug as string] = category.id as number
    }
  }

  /* ─── 4. Festival events ─── */

  const existingEvents = await payload.find({ collection: 'festival-events', limit: 1 })

  if (existingEvents.totalDocs === 0) {
    const eventsData = [
      {
        id: 'e01',
        title: 'Oficina de Percussão Corporal com o Grupo Barbatuques',
        timeDisplay: '10h às 12h',
        date: '2026-10-13',
        sortKey: '10:00',
        venueKey: 'marista',
        note: 'Inscrições Esgotadas',
        imageLayout: true,
      },
      {
        id: 'e02',
        title: 'Oficina de Percussão Corporal com o Grupo Barbatuques',
        timeDisplay: '15h às 17h',
        date: '2026-10-13',
        sortKey: '15:00',
        venueKey: 'marista',
        note: 'Inscrições Esgotadas',
        imageLayout: true,
      },
      {
        id: 'e03',
        title: 'Apresentação musical com Ronaldo Gravino',
        timeDisplay: '16h30',
        date: '2026-10-13',
        sortKey: '16:30',
        venueKey: 'aeroporto',
        imageLayout: true,
      },
      {
        id: 'e04',
        title: 'Roda de Conversa com Grupo Barbatuques',
        timeDisplay: '19h às 20h',
        date: '2026-10-13',
        sortKey: '19:00',
        venueKey: 'marista',
        imageLayout: true,
      },
      {
        id: 'e05',
        title: 'Apresentação musical com Ronaldo Gravino',
        timeDisplay: '07h30',
        date: '2026-10-14',
        sortKey: '07:30',
        venueKey: 'prefeitura',
        imageLayout: false,
      },
      {
        id: 'e06',
        title: 'Show Barbatuques',
        timeDisplay: '20h',
        date: '2026-10-14',
        sortKey: '20:00',
        venueKey: 'marista',
        imageLayout: false,
      },
      {
        id: 'e07',
        title: 'Apresentação musical com Naipe de Copas',
        timeDisplay: '07h30',
        date: '2026-10-15',
        sortKey: '07:30',
        venueKey: 'saude',
        imageLayout: false,
      },
      {
        id: 'e08',
        title: 'Concerto da Orquestra Sinfônica do Paraná',
        timeDisplay: '20h',
        date: '2026-10-15',
        sortKey: '20:00',
        venueKey: 'calil',
        imageLayout: false,
      },
      {
        id: 'e09',
        title: 'Convite à Música',
        timeDisplay: '20h',
        date: '2026-10-15',
        sortKey: '20:00',
        venueKey: 'luzamor',
        imageLayout: false,
      },
      {
        id: 'e10',
        title: 'Apresentação musical com Escola ADM Academia de Música',
        timeDisplay: '17h',
        date: '2026-10-16',
        sortKey: '17:00',
        venueKey: 'terminal',
        imageLayout: false,
      },
      {
        id: 'e11',
        title: 'Convite à Música com Pé de Laranjeira',
        timeDisplay: '20h',
        date: '2026-10-16',
        sortKey: '20:00',
        venueKey: 'barracao',
        imageLayout: false,
      },
      {
        id: 'e12',
        title: 'Baile da Longevidade com show de Tercilio Men',
        timeDisplay: '14h',
        date: '2026-10-17',
        sortKey: '14:00',
        venueKey: 'alvorada',
        imageLayout: false,
      },
      {
        id: 'e13',
        title: 'Concurso de Música Estudantil',
        timeDisplay: '19h',
        date: '2026-10-17',
        sortKey: '19:00',
        venueKey: 'marista',
        imageLayout: false,
      },
      {
        id: 'e14',
        title: 'Apresentação Musical Nalva Máximo',
        timeDisplay: '20h',
        date: '2026-10-17',
        sortKey: '20:00',
        venueKey: 'rodoviaria',
        imageLayout: false,
      },
      {
        id: 'e15',
        title: 'Apresentação musical Jean & Caue',
        timeDisplay: '09h',
        date: '2026-10-18',
        sortKey: '09:00',
        venueKey: 'willie',
        imageLayout: false,
      },
      {
        id: 'e16',
        title: 'Shows musicais e Feira de Artesanato',
        timeDisplay: '09h',
        date: '2026-10-19',
        sortKey: '09:00',
        venueKey: 'inga',
        imageLayout: false,
      },
      {
        id: 'e17',
        title: 'Mega Concert',
        timeDisplay: '16h',
        date: '2026-10-19',
        sortKey: '16:00',
        venueKey: 'jorge',
        imageLayout: false,
      },
    ]

    for (const event of eventsData) {
      const venueId = venueIdMap[event.venueKey]
      if (!venueId) {
        console.warn(`  WARNING: Venue key "${event.venueKey}" not found — skipping event ${event.id}`)
        continue
      }

      await payload.create({
        collection: 'festival-events',
        data: {
          title: event.title,
          slug: `${event.id}-${slugify(event.title)}`,
          date: event.date,
          timeDisplay: event.timeDisplay,
          sortKey: event.sortKey,
          venue: venueId,
          ...(event.note ? { note: event.note } : {}),
          imageLayout: event.imageLayout ?? false,
        },
      })
      console.log(`  Created event: ${event.title} (${event.date} ${event.timeDisplay})`)
    }
  } else {
    console.log('  Festival events already exist — skipping')
  }

  /* ─── 5. Blog posts ─── */

  const existingPosts = await payload.find({ collection: 'blog-posts', limit: 1 })

  if (existingPosts.totalDocs === 0) {
    const postsData = [
      {
        slug: 'orquestra-sinfonica-confirma-presenca',
        title: 'Orquestra Sinfônica do Paraná confirma presença na edição 2026',
        categorySlug: 'programacao',
        excerpt:
          'A renomada Orquestra Sinfônica do Paraná será uma das atrações principais do Festival de Música de Maringá 2026, com apresentação no Teatro Calil Haddad.',
        author: 'Equipe do Festival',
        date: '2026-03-28T12:00:00.000Z',
        readingTime: 4,
        featured: true,
        audioUrl: '/assets/audio/orquestra-placeholder.mp3',
        tags: [{ tag: 'orquestra' }, { tag: 'classica' }, { tag: 'programacao' }],
        body: [
          'A Orquestra Sinfônica do Paraná confirmou oficialmente sua participação na edição 2026 do Festival de Música de Maringá. A apresentação acontecerá no Teatro Calil Haddad, com capacidade para mais de 1.200 pessoas, no dia 15 de outubro.',
          'Sob a regência do maestro Paulo Torres, o programa incluirá obras de Villa-Lobos, Carlos Gomes e composições inéditas de artistas paranaenses. A orquestra trará 68 músicos para a apresentação, que terá duração estimada de duas horas.',
          'Esta será a terceira vez que a Orquestra Sinfônica do Paraná se apresenta no festival. Em 2024, a performance foi considerada um dos pontos altos da edição, com lotação máxima e mais de 15 minutos de aplausos ao final do concerto.',
          '"Maringá tem um público extremamente receptivo à música clássica. É uma honra voltar a este palco", declarou o maestro Paulo Torres em entrevista exclusiva ao Festival.',
          'Os ingressos para a apresentação estarão disponíveis a partir de agosto, com desconto de 30% para estudantes e professores da rede pública. A organização recomenda antecedência na compra, já que a edição de 2024 esgotou em menos de uma semana.',
        ],
      },
      {
        slug: 'inscricoes-concurso-musica-estudantil',
        title: 'Inscrições abertas para o Concurso de Música Estudantil',
        categorySlug: 'concursos',
        excerpt:
          'Estudantes de 12 a 18 anos já podem se inscrever no Concurso de Música Estudantil. Vagas limitadas para instrumentistas e cantores de toda a região.',
        author: 'Coordenação de Concursos',
        date: '2026-03-25T12:00:00.000Z',
        readingTime: 3,
        featured: false,
        tags: [{ tag: 'concurso' }, { tag: 'estudantil' }, { tag: 'inscricoes' }],
        body: [
          'O Festival de Música de Maringá anuncia a abertura das inscrições para o Concurso de Música Estudantil 2026. Voltado para jovens talentos entre 12 e 18 anos, o concurso aceita instrumentistas e cantores de qualquer gênero musical.',
          'As inscrições podem ser feitas pelo site oficial do festival até o dia 15 de agosto. Cada candidato deve enviar um vídeo de até 5 minutos demonstrando sua habilidade musical, além de uma carta de recomendação de um professor ou mentor.',
          'O concurso oferece 50 vagas no total, divididas entre as categorias instrumento solo, canto e conjunto. Os semifinalistas serão anunciados em setembro e se apresentarão ao vivo durante o festival, no dia 16 de outubro.',
          'Os três primeiros colocados de cada categoria receberão bolsas de estudo em conservatórios parceiros, além de instrumentos musicais e a oportunidade de se apresentar no palco principal do festival.',
        ],
      },
      {
        slug: 'montagem-palco-principal-2025',
        title: 'Como foi a montagem do palco principal em 2025',
        categorySlug: 'bastidores',
        excerpt:
          'Mais de 40 profissionais trabalharam durante 5 dias para montar a estrutura que recebeu milhares de espectadores. Veja os bastidores completos.',
        author: 'Produção',
        date: '2026-03-20T12:00:00.000Z',
        readingTime: 5,
        featured: false,
        audioUrl: '/assets/audio/bastidores-placeholder.mp3',
        tags: [{ tag: 'bastidores' }, { tag: 'producao' }, { tag: 'palco' }],
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
        slug: 'oficinas-formacao-musical-educadores',
        title: 'Oficinas de formação musical para educadores',
        categorySlug: 'educacao',
        excerpt:
          'O Festival abre inscrições para oficinas gratuitas voltadas a professores da rede pública de Maringá e região. Capacitação em metodologias musicais.',
        author: 'Núcleo Educacional',
        date: '2026-03-18T12:00:00.000Z',
        readingTime: 3,
        featured: false,
        tags: [{ tag: 'educacao' }, { tag: 'oficinas' }, { tag: 'professores' }],
        body: [
          'O Núcleo Educacional do Festival de Música de Maringá anuncia a abertura de inscrições para as oficinas de formação musical destinadas a educadores da rede pública. As oficinas são gratuitas e oferecem certificação de 40 horas.',
          'O programa abrange metodologias como Dalcroze, Orff e Kodály, adaptadas à realidade das escolas públicas brasileiras. Os encontros acontecerão entre os dias 13 e 17 de outubro, em paralelo à programação do festival.',
          'Cada oficina terá no máximo 25 participantes, garantindo acompanhamento individualizado. Os educadores receberão material didático completo e acesso a uma plataforma digital com recursos complementares para uso em sala de aula.',
          'Em 2025, as oficinas atenderam 150 professores de 32 municípios da região. Pesquisa de acompanhamento mostrou que 87% dos participantes implementaram as técnicas aprendidas em suas escolas no semestre seguinte.',
        ],
      },
      {
        slug: 'pedro-emilio-confirmado-dia-14',
        title: 'Pedro Emílio é confirmado como atração do dia 14',
        categorySlug: 'programacao',
        excerpt:
          'O cantor e compositor Pedro Emílio, revelação da música brasileira, se apresenta no dia 14 de outubro no Parque do Ingá.',
        author: 'Equipe do Festival',
        date: '2026-03-15T12:00:00.000Z',
        readingTime: 3,
        featured: false,
        tags: [{ tag: 'programacao' }, { tag: 'artistas' }, { tag: 'confirmado' }],
        body: [
          'O cantor e compositor Pedro Emílio foi confirmado como uma das atrações do dia 14 de outubro no Festival de Música de Maringá 2026. A apresentação acontecerá no palco principal do Parque do Ingá, às 20h.',
          'Revelação da música brasileira nos últimos dois anos, Pedro Emílio acumula mais de 50 milhões de streams nas plataformas digitais. Seu álbum de estreia, "Raízes Urbanas", mistura MPB contemporânea com elementos de soul e jazz.',
          'O artista prepara um show especial para o festival, com participações de músicos locais. "Maringá sempre foi uma cidade musical para mim. Tocar no festival é realizar um sonho antigo", disse Pedro Emílio em suas redes sociais.',
          'A apresentação terá duração de aproximadamente 90 minutos e incluirá faixas do novo álbum, ainda sem data de lançamento, além dos sucessos já conhecidos do público.',
        ],
      },
      {
        slug: 'hackathon-musical-tecnologia-arte',
        title: 'Hackathon Musical: tecnologia encontra arte',
        categorySlug: 'concursos',
        excerpt:
          'Desenvolvedores e músicos se unem em 48 horas de criação. O Hackathon Musical acontece em paralelo ao festival e premia as melhores soluções criativas.',
        author: 'Coordenação de Concursos',
        date: '2026-03-12T12:00:00.000Z',
        readingTime: 4,
        featured: false,
        tags: [{ tag: 'hackathon' }, { tag: 'tecnologia' }, { tag: 'concurso' }],
        body: [
          'O Hackathon Musical é uma das iniciativas mais inovadoras do Festival de Música de Maringá. Na edição 2026, desenvolvedores, designers e músicos terão 48 horas para criar soluções tecnológicas que conectem tecnologia e arte.',
          'O evento acontecerá nos dias 17 e 18 de outubro, no espaço de coworking do Maringá Tech Hub. As equipes, formadas por 3 a 5 pessoas, devem obrigatoriamente incluir pelo menos um músico e um desenvolvedor.',
          'Os desafios desta edição incluem: criação de ferramentas de composição assistida por IA, plataformas de ensino musical interativo, soluções de acessibilidade para espectadores com deficiência auditiva e aplicativos de conexão entre músicos locais.',
          'O primeiro colocado receberá R$ 15.000 em prêmios, mentoria de três meses com empresas do setor e a oportunidade de apresentar sua solução no palco principal do festival. Os segundo e terceiro lugares receberão R$ 8.000 e R$ 5.000, respectivamente.',
          'As inscrições estão abertas até 30 de setembro pelo site oficial. Não é necessário ter equipe formada — a organização promoverá um evento de formação de times uma semana antes do hackathon.',
        ],
      },
      {
        slug: 'bastidores-apresentacao-aeroporto',
        title: 'Os bastidores da apresentação no aeroporto',
        categorySlug: 'bastidores',
        excerpt:
          'Uma surpresa para os viajantes: músicos do festival se apresentaram no saguão do Aeroporto de Maringá. Confira como foi organizada essa ação especial.',
        author: 'Produção',
        date: '2026-03-10T12:00:00.000Z',
        readingTime: 4,
        featured: false,
        tags: [{ tag: 'bastidores' }, { tag: 'aeroporto' }, { tag: 'acao-especial' }],
        body: [
          'Na manhã de 5 de março, viajantes que passavam pelo saguão do Aeroporto Regional de Maringá foram surpreendidos por uma apresentação musical inesperada. Seis músicos do Festival de Música de Maringá executaram um repertório de 30 minutos que parou o terminal.',
          'A ação foi planejada durante três semanas pela equipe de produção do festival. O objetivo era divulgar a edição 2026 e levar a música para além dos espaços tradicionais. A escolha do aeroporto não foi aleatória: é o ponto de entrada de visitantes de todo o Brasil.',
          'O repertório incluiu arranjos instrumentais de clássicos da MPB, com destaque para uma versão camerística de "Águas de Março" que emocionou os presentes. Os músicos se posicionaram entre os assentos da sala de embarque, criando uma experiência imersiva.',
          '"A reação das pessoas foi incrível. Muitos pararam para filmar, outros aplaudiram de pé. Uma senhora chorou. É disso que se trata: levar a música onde ela não é esperada", contou a produtora Ana Luíza Mendes.',
          'O vídeo da apresentação, publicado nas redes sociais do festival, alcançou mais de 200 mil visualizações em 48 horas e foi compartilhado por veículos de comunicação de todo o Paraná.',
        ],
      },
      {
        slug: 'chamada-novos-apoiadores',
        title: 'Festival abre chamada para novos apoiadores',
        categorySlug: 'programacao',
        excerpt:
          'Empresas e instituições podem se tornar apoiadoras da edição 2026. Conheça os planos de patrocínio e as vantagens de associar sua marca ao festival.',
        author: 'Equipe do Festival',
        date: '2026-03-08T12:00:00.000Z',
        readingTime: 3,
        featured: false,
        tags: [{ tag: 'apoio' }, { tag: 'patrocinio' }, { tag: 'parceiros' }],
        body: [
          'O Festival de Música de Maringá abre oficialmente a chamada para empresas e instituições interessadas em apoiar a edição 2026. Com quatro planos de patrocínio disponíveis, a organização busca parceiros que compartilhem o compromisso com a cultura e a educação musical.',
          'Os planos variam de R$ 5.000 a R$ 50.000 e incluem benefícios como exposição de marca nos materiais do festival, ingressos VIP, espaço para ativações durante os eventos e menção em toda a comunicação oficial.',
          'Em 2025, o festival contou com 28 apoiadores, entre empresas locais, nacionais e instituições públicas. A meta para 2026 é alcançar 40 parceiros, ampliando tanto o alcance quanto a qualidade da programação oferecida.',
          'Interessados podem acessar o dossiê completo de patrocínio pelo site do festival ou entrar em contato diretamente com a equipe comercial pelo e-mail parcerias@festivalmaringa.com.br.',
        ],
      },
    ]

    for (const post of postsData) {
      const categoryId = categoryIdMap[post.categorySlug]
      if (!categoryId) {
        console.warn(`  WARNING: Category slug "${post.categorySlug}" not found — skipping post ${post.slug}`)
        continue
      }

      await payload.create({
        collection: 'blog-posts',
        data: {
          title: post.title,
          slug: post.slug,
          category: categoryId,
          excerpt: post.excerpt,
          body: stringsToLexical(post.body),
          author: post.author,
          date: post.date,
          readingTime: post.readingTime,
          featured: post.featured ?? false,
          ...(post.audioUrl ? { audioUrl: post.audioUrl } : {}),
          tags: post.tags,
        },
      })
      console.log(`  Created post: ${post.title}`)
    }
  } else {
    console.log('  Blog posts already exist — skipping')
  }

  /* ─── 6. Contests ─── */

  const existingContests = await payload.find({ collection: 'contests', limit: 1 })

  if (existingContests.totalDocs === 0) {
    const contestsData = [
      {
        slug: 'musica-estudantil',
        title: 'Concurso de Música Estudantil',
        subtitle: 'O palco da próxima geração musical de Maringá',
        date: '15 de Outubro de 2026',
        time: '19h',
        location: 'Teatro Calil Haddad',
        color: 'purple' as const,
        status: 'aberto' as const,
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
          {
            fieldName: 'idade',
            label: 'Idade',
            fieldType: 'number' as const,
            placeholder: 'Ex: 18',
            required: true,
          },
          {
            fieldName: 'instrumento',
            label: 'Instrumento Principal',
            fieldType: 'select' as const,
            placeholder: 'Selecione o instrumento',
            required: true,
            options: [
              { value: 'Violão' },
              { value: 'Guitarra' },
              { value: 'Baixo' },
              { value: 'Bateria' },
              { value: 'Teclado/Piano' },
              { value: 'Violino' },
              { value: 'Flauta' },
              { value: 'Saxofone' },
              { value: 'Voz' },
              { value: 'Outro' },
            ],
          },
          {
            fieldName: 'instituicao',
            label: 'Instituição de Ensino',
            fieldType: 'text' as const,
            placeholder: 'Nome da escola ou faculdade',
            required: true,
          },
        ],
      },
      {
        slug: 'mega-concert',
        title: 'Mega Concert',
        subtitle: 'Milhares de vozes. Uma só canção.',
        date: '18 de Outubro de 2026',
        time: '18h',
        location: 'Estádio Willie Davids',
        color: 'orange' as const,
        status: 'aberto' as const,
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
          {
            fieldName: 'nomeGrupo',
            label: 'Nome do Grupo/Banda',
            fieldType: 'text' as const,
            placeholder: 'Ex: Os Maringaenses',
            required: true,
          },
          {
            fieldName: 'qtdIntegrantes',
            label: 'Quantidade de Integrantes',
            fieldType: 'number' as const,
            placeholder: 'Ex: 5',
            required: true,
          },
          {
            fieldName: 'generoMusical',
            label: 'Gênero Musical',
            fieldType: 'select' as const,
            placeholder: 'Selecione o gênero',
            required: true,
            options: [
              { value: 'MPB' },
              { value: 'Sertanejo' },
              { value: 'Rock' },
              { value: 'Pop' },
              { value: 'Jazz' },
              { value: 'Clássico' },
              { value: 'Gospel' },
              { value: 'Forró' },
              { value: 'Reggae' },
              { value: 'Outro' },
            ],
          },
        ],
      },
      {
        slug: 'hackathon',
        title: 'Hackathon Musical',
        subtitle: 'Tecnologia e música se encontram em 48 horas de inovação',
        date: '16 de Outubro de 2026',
        time: '9h',
        location: 'UEM — Universidade Estadual de Maringá',
        color: 'cyan' as const,
        status: 'aberto' as const,
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
          {
            fieldName: 'nomeEquipe',
            label: 'Nome da Equipe',
            fieldType: 'text' as const,
            placeholder: 'Ex: Equipe Sonora',
            required: true,
          },
          {
            fieldName: 'qtdIntegrantes',
            label: 'Quantidade de Integrantes',
            fieldType: 'number' as const,
            placeholder: 'Ex: 4',
            required: true,
          },
          {
            fieldName: 'areaAtuacao',
            label: 'Área de Atuação',
            fieldType: 'select' as const,
            placeholder: 'Selecione a área',
            required: true,
            options: [
              { value: 'Desenvolvimento de Software' },
              { value: 'Design/UX' },
              { value: 'Produção Musical' },
              { value: 'Educação Musical' },
              { value: 'Inteligência Artificial' },
              { value: 'Hardware/IoT' },
              { value: 'Outro' },
            ],
          },
        ],
      },
    ]

    for (const contest of contestsData) {
      await payload.create({
        collection: 'contests',
        data: {
          title: contest.title,
          slug: contest.slug,
          subtitle: contest.subtitle,
          color: contest.color,
          status: contest.status,
          description: contest.description,
          date: contest.date,
          time: contest.time,
          location: contest.location,
          prizes: contest.prizes,
          criteria: contest.criteria,
          timeline: contest.timeline,
          formFields: contest.formFields,
          registrationUrl: contest.registrationUrl,
          pdfUrl: contest.pdfUrl,
        },
      })
      console.log(`  Created contest: ${contest.title}`)
    }
  } else {
    console.log('  Contests already exist — skipping')
  }

  /* ─── 7. Exchange points ─── */

  const existingExchangePoints = await payload.find({ collection: 'exchange-points', limit: 1 })

  if (existingExchangePoints.totalDocs === 0) {
    const exchangePointsData = [
      {
        name: 'Maringa FM (Sede Principal)',
        address: 'Av. Getulio Vargas, 266 — Terreo, Centro',
        city: 'Maringa',
        cepPrefix: [
          { prefix: '87010' },
          { prefix: '87011' },
          { prefix: '87012' },
          { prefix: '87013' },
          { prefix: '87014' },
          { prefix: '87015' },
          { prefix: '87020' },
          { prefix: '87030' },
          { prefix: '87040' },
          { prefix: '87050' },
          { prefix: '87060' },
          { prefix: '87070' },
          { prefix: '87080' },
        ],
        hours: '13 a 19 de Outubro — 9h as 18h',
        mapsUrl: 'https://maps.google.com/?q=Av+Getulio+Vargas+266+Maringa+PR',
        mapsEmbed:
          'https://maps.google.com/maps?q=Av+Getulio+Vargas+266+Maringa+PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
      },
      {
        name: 'Teatro Calil Haddad',
        address: 'Av. Carneiro Leao, 60 — Zona 01',
        city: 'Maringa',
        cepPrefix: [
          { prefix: '87016' },
          { prefix: '87017' },
          { prefix: '87018' },
          { prefix: '87019' },
        ],
        hours: '13 a 19 de Outubro — 10h as 17h',
        mapsUrl: 'https://maps.google.com/?q=Teatro+Calil+Haddad+Maringa+PR',
        mapsEmbed:
          'https://maps.google.com/maps?q=Teatro+Calil+Haddad+Maringa+PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
      },
      {
        name: 'UEM — Bloco C67',
        address: 'Av. Colombo, 5790 — Jardim Universitario',
        city: 'Maringa',
        cepPrefix: [
          { prefix: '87020' },
          { prefix: '87083' },
          { prefix: '87084' },
          { prefix: '87085' },
        ],
        hours: '14 a 18 de Outubro — 8h as 16h',
        mapsUrl: 'https://maps.google.com/?q=UEM+Universidade+Estadual+de+Maringa',
        mapsEmbed:
          'https://maps.google.com/maps?q=UEM+Universidade+Estadual+de+Maringa&t=&z=16&ie=UTF8&iwloc=&output=embed',
      },
      {
        name: 'Casa da Cultura de Sarandi',
        address: 'Rua Maringa, 890 — Centro',
        city: 'Sarandi',
        cepPrefix: [
          { prefix: '87110' },
          { prefix: '87111' },
          { prefix: '87112' },
          { prefix: '87113' },
          { prefix: '87114' },
          { prefix: '87115' },
        ],
        hours: '15 a 18 de Outubro — 9h as 15h',
        mapsUrl: 'https://maps.google.com/?q=Casa+da+Cultura+Sarandi+PR',
        mapsEmbed:
          'https://maps.google.com/maps?q=Casa+da+Cultura+Sarandi+PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
      },
    ]

    for (const point of exchangePointsData) {
      await payload.create({
        collection: 'exchange-points',
        data: {
          name: point.name,
          address: point.address,
          city: point.city,
          cepPrefix: point.cepPrefix,
          hours: point.hours,
          mapsUrl: point.mapsUrl,
          mapsEmbed: point.mapsEmbed,
        },
      })
      console.log(`  Created exchange point: ${point.name}`)
    }
  } else {
    console.log('  Exchange points already exist — skipping')
  }

  /* ─── 8. Site Settings (expanded) ─── */

  console.log('  Updating site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      festivalName: 'Festival de Música de Maringá',
      festivalDates: '13 a 19 de Outubro de 2026',
      festivalLocation: 'Maringá, Paraná',
      phone: '(44) 3220-4003',
      email: 'contato@festivaldemusicademaringa.com.br',
      address: 'Av. Getúlio Vargas, 266 — Térreo (Maringá FM)',
      addressShort: 'Maringá, PR — 87013-130',
      city: 'Maringá, PR',
      cep: '87013-130',
      ingressoRule: '1KG de Alimento = 1 Ingresso',
      ingressoLimit: 'limitado a 3 por pessoa',
      ingressoStartDate: '13/10',
      ingressoHours: '9h às 18h',
      pillarWords: [
        { word: 'Cultura' },
        { word: 'Entretenimento' },
        { word: 'Educação' },
      ],
      footerTagline: 'Cidade Canção',
      copyrightName: 'Festival de Música de Maringá e Região',
      socialLinks: {
        instagram: 'https://instagram.com/festivaldemusicademaringa',
        facebook: 'https://facebook.com/festivaldemusicademaringa',
        youtube: 'https://youtube.com/@festivaldemusicademaringa',
      },
      siteUrl: 'https://festivaldemusicademaringa.com.br',
      spotifyEnable: true,
      spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZlBWh8A1Ygd',
    },
  })
  console.log('  Site settings updated')

  /* ─── 9. Home Page global ─── */

  console.log('  Updating home page global...')
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroSubtitle: 'A cidade se torna instrumento, o povo se torna platéia e a música é a protagonista.',
      heroCountdownLabel: 'Falta pouco para o festival',
      heroCta1Label: 'Garanta sua vaga',
      heroCta1Href: '/garanta-sua-vaga',
      heroCta2Label: 'Ver Programação',
      heroCta2Href: '#programacao',
      countdownTargetDate: '2026-10-13T18:00:00-03:00',
      aboutBadge: 'O Festival',
      aboutHeading: 'Transformar Maringá na',
      aboutHeadingAccent: 'Capital da Música',
      aboutParagraph1: 'Em 2026, o festival propõe unir cultura, educação e entretenimento, fortalecendo a identidade artística local. De 13 a 19 de outubro, a música toma conta das ruas, praças, escolas, teatros e espaços públicos.',
      aboutParagraph2: 'Inspirado no Festival de Dança de Joinville e no Festival de Música de Viena, o projeto nasceu com a missão de posicionar Maringá — a Cidade Canção — como polo musical de referência nacional.',
      statsLabel: 'Edição 2025 em Números',
      statsFooter: 'em 2026 esperamos ainda mais',
      stats: [
        { value: 35, suffix: 'h+', label: 'de música ao vivo', color: 'purple' },
        { value: 20, suffix: 'mil+', label: 'pessoas nas ruas', color: 'orange' },
        { value: 2500, suffix: '+', label: 'pessoas nos teatros', color: 'cyan' },
        { value: 2.3, suffix: 'M+', label: 'impactos na mídia', color: 'purple' },
      ],
      atracoesBadge: 'Confirmados',
      atracoesHeading: 'Principais Atrações',
      locationBadge: 'O Local',
      locationHeading: 'Maringá,',
      locationHeadingAccent: 'Cidade Canção',
      locationDescription: 'O festival acontece em diversos pontos da cidade — teatros, praças, ruas, parques, escolas, aeroporto e rodoviária. Uma semana inteira de música espalhada por Maringá.',
    },
  })
  console.log('  Home page global updated')

  /* ─── 10. Programação Page global ─── */

  console.log('  Updating programacao page global...')
  await payload.updateGlobal({
    slug: 'programacao-page',
    data: {
      badge: 'Programação 2026',
      heading: 'Programação',
      subtitle: '7 dias de música em 7 palcos pela cidade — 13 a 19 de Outubro',
      festivalDays: [
        { date: '2026-10-13', dayOfWeek: 'Seg', dayOfWeekFull: 'Segunda-feira', dayNumber: 13 },
        { date: '2026-10-14', dayOfWeek: 'Ter', dayOfWeekFull: 'Terça-feira', dayNumber: 14 },
        { date: '2026-10-15', dayOfWeek: 'Qua', dayOfWeekFull: 'Quarta-feira', dayNumber: 15 },
        { date: '2026-10-16', dayOfWeek: 'Qui', dayOfWeekFull: 'Quinta-feira', dayNumber: 16 },
        { date: '2026-10-17', dayOfWeek: 'Sex', dayOfWeekFull: 'Sexta-feira', dayNumber: 17 },
        { date: '2026-10-18', dayOfWeek: 'Sáb', dayOfWeekFull: 'Sábado', dayNumber: 18 },
        { date: '2026-10-19', dayOfWeek: 'Dom', dayOfWeekFull: 'Domingo', dayNumber: 19 },
      ],
      metaTitle: 'Programação',
      metaDescription: 'Confira a programação completa do Festival de Música de Maringá 2026 — 7 dias de eventos musicais em 7 palcos pela cidade. De 13 a 19 de outubro.',
    },
  })
  console.log('  Programacao page global updated')

  /* ─── 11. Concursos Page global ─── */

  console.log('  Updating concursos page global...')
  await payload.updateGlobal({
    slug: 'concursos-page',
    data: {
      badge: 'Participe',
      heading: 'Concursos',
      subtitle: 'Mostre seu talento e concorra a prêmios em dinheiro, troféus e oportunidades únicas no maior festival de música de Maringá.',
      metaTitle: 'Concursos',
      metaDescription: 'Participe dos concursos do Festival de Música de Maringá 2026 — Concurso de Música Estudantil, Mega Concert e Hackathon Musical.',
    },
  })
  console.log('  Concursos page global updated')

  /* ─── 12. Notícias Page global ─── */

  console.log('  Updating noticias page global...')
  await payload.updateGlobal({
    slug: 'noticias-page',
    data: {
      badge: 'Blog',
      heading: 'Notícias do Festival',
      subtitle: 'Fique por dentro de tudo que acontece no Festival de Música de Maringá — programação, bastidores, concursos e muito mais.',
      metaTitle: 'Notícias do Festival',
      metaDescription: 'Acompanhe as últimas notícias do Festival de Música de Maringá 2026 — programação, bastidores, concursos e educação musical.',
    },
  })
  console.log('  Noticias page global updated')

  /* ─── 13. Apoie Page global ─── */

  console.log('  Updating apoie page global...')
  await payload.updateGlobal({
    slug: 'apoie-page',
    data: {
      badge: 'Apoie o Festival',
      heading: 'Sua Marca no Evento',
      subtitle: 'Conecte sua marca a um festival que une cultura, educação e entretenimento, impactando milhares de pessoas em toda a região de Maringá.',
      benefitsLabel: 'Por Que Apoiar',
      benefitsHeading: 'Benefícios para sua Marca',
      benefits: [
        { title: 'Conexão com Diferentes Públicos', description: 'Alta visibilidade nos eventos e na mídia, alcançando públicos diversos em toda a região.', iconType: 'audience', color: 'purple' },
        { title: 'Ativações Criativas', description: 'Oportunidades de interação direta com o público em espaços estratégicos do festival.', iconType: 'creative', color: 'orange' },
        { title: 'Impacto Social e Educacional', description: 'Apoio à formação de novos talentos e à democratização do acesso à música.', iconType: 'social', color: 'cyan' },
        { title: 'Geração de Valor para a Região', description: 'Fortalecimento da economia criativa, incentivo ao turismo e movimentação de comércio, hotelaria e serviços.', iconType: 'regional', color: 'purple' },
        { title: 'Legado Institucional', description: 'Patrocinar um evento que vai além do entretenimento e deixa uma contribuição duradoura para a cidade.', iconType: 'legacy', color: 'orange' },
        { title: 'Alta Visibilidade', description: 'Presença de marca em materiais, mídias digitais, painéis e palcos do festival.', iconType: 'visibility', color: 'peach' },
      ],
      editionLabel: 'Resultados',
      editionHeading: 'Edição 2025',
      editionParagraph: 'A edição 2025 reuniu a Orquestra Sinfônica do Paraná, grandes shows e intervenções em espaços inusitados como o aeroporto e a rodoviária de Maringá. Oficinas de formação musical, o concurso estudantil e programação descentralizada impactaram milhares de pessoas em uma semana de pura cultura.',
      editionStats: [
        { value: 35, prefix: '+', suffix: '', label: 'Horas de música' },
        { value: 2500, prefix: '+', suffix: '', label: 'Pessoas nos teatros' },
        { value: 20000, prefix: '+', suffix: '', label: 'Pessoas impactadas nas ruas' },
        { value: 100, prefix: '+', suffix: '', label: 'Profissionais da educação musical' },
      ],
      mediaLabel: 'Cobertura',
      mediaHeading: 'Na Mídia',
      mediaStats: [
        { category: 'Rádio', metric: '535 spots', value: 2332469, suffix: ' impactos', iconType: 'radio' },
        { category: 'Redes Sociais', metric: 'Alcance orgânico', value: 130, suffix: ' mil visualizações', iconType: 'social' },
        { category: 'Portal', metric: 'Conteúdo patrocinado', value: 657, suffix: ' mil impressões', iconType: 'web' },
        { category: 'Imprensa', metric: 'Cobertura editorial', value: 30, suffix: '+ publicações', iconType: 'press' },
      ],
      formLabel: 'Formulário',
      formHeading: 'Quero Apoiar o Festival',
      formSubtitle: 'Preencha o formulário e nossa equipe entrará em contato',
      formSuccessTitle: 'Mensagem Enviada!',
      formSuccessMessage: 'Obrigado pelo interesse em apoiar o Festival de Música de Maringá. Nossa equipe entrará em contato em breve.',
      metaTitle: 'Apoie o Festival',
      metaDescription: 'Seja um apoiador do Festival de Música de Maringá. Conecte sua marca a cultura, educação e entretenimento.',
    },
  })
  console.log('  Apoie page global updated')

  /* ─── 14. Garanta Page global ─── */

  console.log('  Updating garanta page global...')
  await payload.updateGlobal({
    slug: 'garanta-page',
    data: {
      eyebrow: 'Entrada Gratuita',
      heading: 'Garanta sua Vaga',
      subtitle: 'Preencha seus dados e descubra o ponto de troca mais próximo de você',
      donationNotice: 'Leve 1kg de alimento não perecível para trocar pelo seu ingresso. Limite de 3 ingressos por pessoa.',
      successHeading: 'Vaga Garantida!',
      nearestPointLabel: 'Ponto de Troca Mais Próximo',
      metaTitle: 'Garanta sua Vaga',
      metaDescription: 'Garanta seu ingresso gratuito para o Festival de Música de Maringá 2026. Troque 1kg de alimento não perecível pelo seu ingresso.',
    },
  })
  console.log('  Garanta page global updated')

  console.log('\nSeed complete!')
  return { success: true }
}
