import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'tobeewitched/tobeewitched_site'
  },
  collections: {
    essays: collection({
      label: 'Эссе и Заметки',
      slugField: 'title',
      path: 'src/content/essays/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        date: fields.date({ label: 'Дата публикации' }),
        tag: fields.text({ label: 'Категория', defaultValue: 'Заметка' }),
        ambientTrack: fields.text({ label: 'Название трека (оставь пустым, если не нужно)' }),
        audioFile: fields.text({ label: 'Ссылка на файл (например: /audio/track.mp3)' }),
        readingTime: fields.text({ label: 'Время чтения (например: 12 мин)' }),
        content: fields.markdoc({ 
          label: 'Текст статьи',
          extension: 'mdoc',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/'
            }
          }
        }),
      },
    }),
    research: collection({
      label: 'Исследования',
      slugField: 'title',
      path: 'src/content/research/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        date: fields.date({ label: 'Дата публикации' }),
        tag: fields.text({ label: 'Категория', defaultValue: 'Препринт' }),
        ambientTrack: fields.text({ label: 'Название трека' }),
        audioFile: fields.text({ label: 'Ссылка на файл' }),
        readingTime: fields.text({ label: 'Время чтения' }),
        content: fields.markdoc({ 
          label: 'Текст',
          extension: 'mdoc',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/'
            }
          }
        }),
      },
    }),
    stories: collection({
      label: 'Рассказы',
      slugField: 'title',
      path: 'src/content/stories/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        date: fields.date({ label: 'Дата публикации' }),
        tag: fields.text({ label: 'Категория', defaultValue: 'Рассказ' }),
        ambientTrack: fields.text({ label: 'Название трека' }),
        audioFile: fields.text({ label: 'Ссылка на файл' }),
        readingTime: fields.text({ label: 'Время чтения' }),
        content: fields.markdoc({ 
          label: 'Текст',
          extension: 'mdoc',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/'
            }
          }
        }),
      },
    }),
    about: collection({
      label: 'Обо мне (Разделы)',
      slugField: 'title',
      path: 'src/content/about/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Название раздела (Например: Биография)' } }),
        order: fields.number({ label: 'Порядок вывода (1 - самый первый, 2 - ниже и т.д.)', defaultValue: 1 }),
        content: fields.markdoc({ 
          label: 'Текст',
          extension: 'mdoc',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/'
            }
          }
        }),
      },
    }),
    publications: collection({
      label: 'Публикации',
      slugField: 'title',
      path: 'src/content/publications/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Название статьи' } }),
        year: fields.text({ label: 'Год издания', defaultValue: '2024' }),
        journal: fields.text({ label: 'Название журнала / издательства' }),
        status: fields.select({
          label: 'Статус публикации',
          defaultValue: 'published',
          options: [
            { label: 'Опубликовано', value: 'published' },
            { label: 'В печати / На рецензии', value: 'upcoming' }
          ]
        }),
        linkText: fields.text({ label: 'Текст ссылки (например: Скачать PDF)', defaultValue: 'Читать онлайн' }),
        linkUrl: fields.text({ label: 'URL ссылки' }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: 'Главная страница (Настройки)',
      path: 'src/content/home/settings',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Крупный заголовок', defaultValue: 'Исследуя структуры воображения.' }),
        heroText: fields.text({ label: 'Текст под заголовком (Абзац 1)', multiline: true }),
        heroText2: fields.text({ label: 'Текст под заголовком (Абзац 2)', multiline: true }),
        heroImage: fields.text({ label: 'Ссылка на ваше фото', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }),
        telegramLink: fields.text({ label: 'Ссылка на Telegram', defaultValue: 'https://t.me/' }),
      },
    }),
    site: singleton({
      label: 'Настройки сайта (Шапка, Подвал и Тексты)',
      path: 'src/content/site/settings',
      format: { data: 'json' },
      schema: {
        siteTitle: fields.text({ label: 'Главный логотип', defaultValue: 'tobeewitched.' }),
        siteSubtitle: fields.text({ label: 'Подзаголовок сайта', defaultValue: 'Академический журнал & Исследовательская база' }),
        footerText: fields.text({ label: 'Текст в подвале (копирайт)', defaultValue: '© 2024 tobeewitched.' }),
        aboutDesc: fields.text({ label: 'Текст для раздела "Обо мне"', multiline: true, defaultValue: 'Мой академический путь, биография и сфера научных интересов.' }),
        researchDesc: fields.text({ label: 'Текст для "Исследований"', multiline: true, defaultValue: 'Мои научные статьи, монографии и полевые заметки.' }),
        essaysDesc: fields.text({ label: 'Текст для "Эссе"', multiline: true, defaultValue: 'Здесь собраны мои развернутые тексты и заметки.' }),
        storiesDesc: fields.text({ label: 'Текст для "Рассказов"', multiline: true, defaultValue: 'Художественные тексты, литературные эксперименты и проза.' }),
        pubsDesc: fields.text({ label: 'Текст для "Публикаций"', multiline: true, defaultValue: 'Полный список научных статей, распределенный по статусу.' }),
      },
    }),
    test: singleton({
      label: 'Настройки Теста (Результаты)',
      path: 'src/content/test/data',
      format: { data: 'json' },
      schema: {
        introTitle: fields.text({ label: 'Заголовок интро', defaultValue: 'Архитектура Воображаемого' }),
        introText: fields.text({ label: 'Текст интро', multiline: true }),
        results: fields.array(
          fields.object({
            code: fields.text({ label: 'Код (НЕ МЕНЯТЬ! Например: Day_Summer_Clear)' }),
            title: fields.text({ label: 'Название профиля' }),
            image: fields.text({ label: 'Ссылка на картинку (или /images/файл.jpg)' }),
            quote: fields.text({ label: 'Цитата' }),
            desc: fields.text({ label: 'Описание', multiline: true }),
            pros: fields.text({ label: 'Сильные стороны', multiline: true }),
            cons: fields.text({ label: 'Слабые стороны', multiline: true })
          }),
          { itemLabel: props => props.value.title || 'Новый результат' }
        )
      }
    }),
  },
});