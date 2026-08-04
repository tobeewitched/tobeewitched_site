import { config, fields, collection, singleton, component } from '@keystatic/core';

// Настройка кастомных блоков для редактора
const markdocConfig = fields.markdoc({
  label: 'Текст',
  extension: 'mdoc',
  options: {
    image: {
      directory: 'public/images/posts',
      publicPath: '/images/posts/',
    },
  },
  components: {
    // БЛОК 1: Картинка с подписью и размером
    imageWithCaption: component({
      label: '📷 Картинка с подписью и размером',
      preview: (props) => props.fields.caption.value || 'Картинка',
      schema: {
        image: fields.image({
          label: 'Загрузить изображение',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        caption: fields.text({ label: 'Подпись под фото' }),
        size: fields.select({
          label: 'Размер картинки на странице',
          defaultValue: 'full',
          options: [
            { label: 'На всю ширину (100%)', value: 'full' },
            { label: 'Средняя (75%)', value: 'medium' },
            { label: 'Компактная (50%)', value: 'small' },
          ],
        }),
      },
    }),
    // БЛОК 2: Красивая Цитата / Плашка
    callout: component({
      label: '💬 Выделенный блок / Цитата',
      preview: (props) => props.fields.text.value || 'Цитата',
      schema: {
        type: fields.select({
          label: 'Стиль блока',
          defaultValue: 'note',
          options: [
            { label: 'Заметка (Серая)', value: 'note' },
            { label: 'Важно (Желтая)', value: 'warning' },
            { label: 'Премиум Цитата (Черная)', value: 'quote' },
          ],
        }),
        text: fields.text({ label: 'Текст цитаты или заметки', multiline: true }),
      },
    }),
  },
});

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'tobeewitched/tobeewitched',
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
        ambientTrack: fields.text({ label: 'Название трека' }),
        audioFile: fields.text({ label: 'Ссылка на файл (/audio/track.mp3)' }),
        readingTime: fields.text({ label: 'Время чтения' }),
        content: markdocConfig,
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
        content: markdocConfig,
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
        content: markdocConfig,
      },
    }),
    about: collection({
      label: 'Обо мне (Разделы)',
      slugField: 'title',
      path: 'src/content/about/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Название раздела' } }),
        order: fields.number({ label: 'Порядок вывода', defaultValue: 1 }),
        content: markdocConfig,
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
        journal: fields.text({ label: 'Журнал / Издательство' }),
        status: fields.select({
          label: 'Статус',
          defaultValue: 'published',
          options: [
            { label: 'Опубликовано', value: 'published' },
            { label: 'В печати', value: 'upcoming' }
          ]
        }),
        linkText: fields.text({ label: 'Текст ссылки', defaultValue: 'Читать онлайн' }),
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
        heroImage: fields.text({ label: 'Ссылка на фото' }),
        telegramLink: fields.text({ label: 'Ссылка на Telegram', defaultValue: 'https://t.me/' }),
      },
    }),
    site: singleton({
      label: 'Настройки сайта (Шапка, Подвал и Тексты)',
      path: 'src/content/site/settings',
      format: { data: 'json' },
      schema: {
        siteTitle: fields.text({ label: 'Главный логотип', defaultValue: 'tobeewitched.' }),
        siteSubtitle: fields.text({ label: 'Подзаголовок сайта' }),
        footerText: fields.text({ label: 'Текст в подвале' }),
        aboutDesc: fields.text({ label: 'Текст "Обо мне"', multiline: true }),
        researchDesc: fields.text({ label: 'Текст "Исследований"', multiline: true }),
        essaysDesc: fields.text({ label: 'Текст "Эссе"', multiline: true }),
        storiesDesc: fields.text({ label: 'Текст "Рассказов"', multiline: true }),
        pubsDesc: fields.text({ label: 'Текст "Публикаций"', multiline: true }),
      },
    }),
    test: singleton({
      label: 'Настройки Теста (Результаты)',
      path: 'src/content/test/data',
      format: { data: 'json' },
      schema: {
        introTitle: fields.text({ label: 'Заголовок интро' }),
        introText: fields.text({ label: 'Текст интро', multiline: true }),
        results: fields.array(
          fields.object({
            code: fields.text({ label: 'Код' }),
            title: fields.text({ label: 'Название' }),
            image: fields.text({ label: 'Картинка' }),
            quote: fields.text({ label: 'Цитата' }),
            desc: fields.text({ label: 'Описание', multiline: true }),
            pros: fields.text({ label: 'Сильные стороны', multiline: true }),
            cons: fields.text({ label: 'Слабые стороны', multiline: true })
          }),
          { itemLabel: props => props.value.title || 'Результат' }
        )
      }
    }),
  },
});
