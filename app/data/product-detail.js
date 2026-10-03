const GALLERY_MAIN =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBMcPjAe2d1kJYYNwHp3gxc0VaJiOh3w_D2644euzi2aFMBb1zLyZ6ViOWyicNmKeqwDVnGNXN66vJ8vH4CwOOlPwluyZNooKWndMf0FwQV4vGs5wZ4efsc0fXX5p35-Vgoy1uOywP--eoVPklnpVikrJqrrnRzgyhEjkEzO_hBxRUqaoSXYYsFOC_KV3ZUNtrnFirW54Os7KlmDKUgTzv1I81u68UpeffY6h7bxRqO1pYrLd0hubcP'

export const mockProductDetail = {
  slug: 'tarom-hashemi-10kg',
  agriculturalId: 'MR-8409-FD',
  ribbon: 'محصول منتخب آتلیه طعم | پاییز ۱۴۰۳',
  title: 'برنج طارم هاشمی درجه یک اعلا',
  description:
    'کشت نخست شالیزارهای حوزه آبریز رودخانه هراز و دشت فریدونکنار. محصول دانه‌بلند، سپید عاجی و الک‌شده با هوادهی سنتی در کندوج و عطر ماندگار در پخت مجلسی.',
  rating: '۴.۹',
  reviewCount: '۱۲۸',
  reviewLinkLabel: '۱۲۸ بازخورد طعم‌سنجی مستند',
  price: '۱,۹۵۰,۰۰۰',
  priceLabel: 'ارزش محصول برای وزن منتخب',
  priceNote: 'شامل هزینه بسته‌بندی نفیس و بیمه کالا',
  stockTitle: 'موجود در انبار آتلیه',
  stockHint: 'آماده ارسال فوری روز در بسته‌بندی نفیس',
  packagingTitle: 'بسته‌بندی اختصاصی آتلیه',
  packagingDescription: 'کیسه کتان دست‌دوز ۱۰ کیلوگرم با وکیوم داخلی نفوذناپذیر',
  packagingWeight: '۱۰',
  packagingWeightUnit: 'کیلوگرم',
  packagingHint: 'تک‌سایز استاندارد انبار صادراتی',
  breadcrumbs: [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'محصولات منتخب', href: '#' },
    { label: 'برنج اصیل ایرانی', href: '#' },
    { label: 'برنج طارم هاشمی ممتاز ۱۰ کیلوگرمی' },
  ],
  trustBadge: 'سند تضمین آزمایشگاهی اصالت دانه',
  gallery: {
    mainAlt:
      'بسته ۱۰ کیلوگرمی برنج طارم هاشمی ممتاز مستر رایس با بسته‌بندی کتان و تریم طلایی',
    zoomHint: 'بزرگ‌نمایی با لمس یا اشاره‌گر',
    badges: [
      { text: 'تک‌خاستگاه فریدونکنار', icon: 'eco', position: 'top-right', variant: 'primary' },
      { text: 'خلوص ژنتیکی ۹۹.۸٪', icon: 'verified', position: 'top-right', variant: 'surface' },
      { text: 'وکیوم ضدآفت ۳ لایه', icon: 'layers', position: 'top-left', variant: 'muted' },
    ],
    images: [
      {
        src: GALLERY_MAIN,
        alt: 'نمای روبرو کیسه ۱۰ کیلوگرمی',
        label: 'نمای روبرو',
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA--qEaLoH3jAJcsuDgrFccW7keja8fNALXQAm5ARTGWjRPxMJ7zkZLwVXvPBEmGRD7_wIG8TaXLOho0owxPbB2KeAWDNAyL4rS6IzNo2bMk4MUDHuR4JcDs495MIH6dTgbzysEQxcRTbdxGf5P5rSxDTlhv3UX7xzw5WQW3WbcblkkLPBWfify7LmZiOzW47UwU7yGVsNAN1rIswWWnKouzbZ4g4zd4ZolswtyZayHR8uYj4Oc0dO',
        alt: 'نمای پشت و شناسنامه محصول',
        label: 'شناسنامه پشت',
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpwqXn_rrTitzYZgeNvbqLuTIqRM4Qkn5qYAvrX4Q5vvx2cEZGl1tHm_LSRkPzgQ3EWoZ0J7xKO-v6Z-1Fsq-bPl-O30ytp9nzXAvtDD6BG7lsiRTrKBilhlU-OoJIc8uIPRN9Z631Jl8MVQknUUdqixVWdl4KIYXJbWXDEVVPBtPd5ywV9kK-vTsDq1zD3jElza94zmMCbWlJaP__bpcB5i-C1rbyNgD0MbbDWGgBGQaS_Oj9mH7m',
        alt: 'سنجش دانه‌های طارم هاشمی',
        label: 'سنجش دانه',
      },
      {
        src: GALLERY_MAIN,
        alt: 'پلمپ اصالت',
        label: 'پلمپ اصالت',
        icon: 'verified',
      },
    ],
  },
  labMetrics: [
    {
      label: 'قد پس از پخت',
      value: '۱۳.۲',
      valueSuffix: 'میلی‌متر',
      hint: 'ری سنتی دوچندان',
      icon: 'straighten',
      accent: 'primary',
    },
    {
      label: 'میزان شکستگی',
      value: 'زیر ۱٪',
      hint: 'سورتینگ لیزری دوبل',
      icon: 'grain',
      accent: 'primary',
    },
    {
      label: 'شاخص رطوبت',
      value: '۱۳.۵٪',
      hint: 'رسیده در انبار کندوج',
      icon: 'water_drop',
      accent: 'secondary',
    },
    {
      label: 'کلاس عطر',
      value: 'اعلا طارم',
      hint: 'پایدار تا ۲۴ ساعت',
      icon: 'nest_eco_leaf',
      accent: 'secondary',
    },
  ],
  labSectionTitle: 'سنجش آزمایشگاهی دانه',
  labSectionBadge: 'استاندارد کیفی A+',
  trustGuarantees: [
    {
      title: 'ارسال ایمن و بیمه‌شده',
      description: 'تحویل درب منزل با کارتن محافظ',
      icon: 'local_shipping',
      iconClass: 'bg-secondary-100 text-secondary-800',
    },
    {
      title: 'ضمانت بازگشت ۷ روزه',
      description: 'در صورت عدم رضایت از عطر یا پخت',
      icon: 'assignment_return',
      iconClass: 'bg-primary-100 text-primary-600',
    },
    {
      title: 'وکیوم نفوذناپذیر',
      description: 'محافظت قطعی در برابر شپشک و نم',
      icon: 'air',
      iconClass: 'bg-primary-50 text-muted',
    },
  ],
  provenance: {
    sectionLabel: 'منشور اصالت خاستگاه',
    title: 'راز عطر و بافت بی‌همتای دشت فریدونکنار',
    body:
      'شالیزارهای فریدونکنار به سبب رسوب‌گذاری هزارساله رودهای جاری از رشته‌کوه البرز و زیست‌بوم تالابی سرشار از فسفر و پتاس طبیعی، خاکی منحصربه‌فرد را پدید آورده‌اند. دانه‌های طارم هاشمی مستر رایس، دسترنج کشاورزانی است که ۳ نسل با بهره‌گیری از روش‌های همزیستی سنتی با پرندگان مهاجر، نیاز به سموم شیمیایی را به حداقل ممکن رسانده‌اند.',
    highlights: [
      {
        title: 'آبیاری با آب زلال جاری البرز',
        description: 'فاقد هرگونه پساب صنعتی یا آب چاه شور',
      },
      {
        title: 'خواب سیلو در دمای کنترل‌شده',
        description: 'عمل‌آوری اصیل برای ری‌کردن حداکثری',
      },
    ],
    location: 'مازندران، فریدونکنار، دهستان باریک‌رود',
    coordinates: '۳۶°۴۱\'شمالی ۵۲°۳۱\'شرقی',
    accordionHighlight: 'برداشت سنتی دست‌چین با خشک‌کردن آرام در سایه‌سار انبار چوبی',
  },
  cooking: {
    sectionLabel: 'دستور پخت آتلیه',
    title: 'دستور طلایی چلو مجلسی دون',
    steps: [
      {
        number: 1,
        title: 'شست‌وشوی ملایم و خیساندن',
        description:
          'دو تا سه بار بدون چنگ زدن آبکشی نموده و به مدت ۲ تا ۳ ساعت همراه با ۲ قاشق نمک در آب ولرم بخیسانید.',
      },
      {
        number: 2,
        title: 'شوک آب سرد حین جوشیدن',
        description:
          'در اوج قل‌قل دیگ، نصف پیمانه آب بسیار سرد یا یخ بیفزایید تا شوک حرارتی باعث کشیدگی فوق‌العاده قد دانه شود.',
      },
      {
        number: 3,
        title: 'دم‌کشی آرام با زعفران',
        description:
          'با شعله ملایم و دم‌کنی پارچه‌ای کتان ۴۰ دقیقه استراحت دهید تا عطر اصیل طارم تمام فضا را فراگیرد.',
      },
    ],
    prepTime: 'زمان آماده‌سازی: ۶۰ دقیقه',
    servingNote: 'تناسب پخت: هر پیمانه برای ۲ نفر',
  },
  related: {
    sectionLabel: 'محصولات دست‌چین همراه',
    title: 'سبد تکمیلی اصالت و طعم',
    viewAllLabel: 'مشاهده همه',
    items: [
      {
        id: 'domsiah-2kg',
        title: 'برنج دم‌سیاه صدری معطر',
        subtitle: 'شاه‌دانه معطر مزارع سرسبز گیلان',
        origin: 'آستانه اشرفیه | گیلان',
        badge: '۲ کیلوگرم',
        price: '۴۴۰,۰۰۰',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBR9pMlXdtKYfFsnydSyjsW3jT5wQKRaR3I8HrMj7a4d4yQzzDHZg5uKfbcSL6BJsmDaGOc4qyNhj0_3-W69S1PwPYQ8xtydvzTPryh7_RqCBllQ1HH9rWIiUFlpZPj05v4qCk5PaOLV8MAFP3mYWcP0KMc1pPnMJKZpXzasp6-5O_8Yu8gNo6fkVgPMJ0lEguc-9E2Zj4_U90RKN3MZ-pI04y4WrcDci9lm8JPa7GVBtEULPItjm0T9lseWm_E00QX5g',
        alt: 'برنج دم‌سیاه صدری معطر آستانه اشرفیه ۲ کیلوگرمی',
      },
      {
        id: 'tarom-kohneh-5kg',
        title: 'طارم محلی کهنه اعلا',
        subtitle: 'رسیده و بدون هرگونه بوی ماندگی',
        origin: 'فریدونکنار | کهنه سیلو',
        badge: '۵ کیلوگرم',
        price: '۱,۰۵۰,۰۰۰',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBUK1Klx-6seDb3wpNrHgskFG0yarxpAVDj96YcGPT6yTAsW75yrnbOTwjCtJEvEbNKzFKCCuAYRmTH5gV2lRlunR25rJ6Gwmk_SX8-UCCX0upwoKHlCwIo_ScGr8quoD56NrcwCp6-5uPCjI9IPugOzEgd03O4Bjs8kCkjm1d9R3OdwFzPuaDaPiE_D-ucsOxksWeVVmoOHpMFQ9_AKnxn-CJCjho5ZArr4OSzvNpp5S-0u0Q2REk3',
        alt: 'طارم محلی کهنه ۵ کیلوگرم',
      },
      {
        id: 'tarom-test-1kg',
        title: 'برنج طارم سوپر ممتاز تست',
        subtitle: 'مناسب برای سنجش پخت پیش از سفارش عمده',
        origin: 'پک نمونه‌سنجی',
        badge: '۱ کیلوگرم',
        price: '۲۳۰,۰۰۰',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAIs2mgzZSJbQljjB2JT9KxYKvOTd-7IMfd0EB8UpAvrUHna3gogcet6JsRdzdU7-wHDKHw0GlVPCuJsemN-TWOmauk0OWitBUQ1R2o3qvpSScUSi8F_s5Hd4qWobT3rFJ_PQFEgQahCCHS5nZjySL3leX7fMU7qz2rmIIy0hgNSdAwLJ8S41h-kpw9EZB4YT5bkVU7uvCZ0K2O-vVO8KHK5QA3lvSTJ6pni-uIMN1bEpIdsTg1Mhr62jfPNfKwo8JCEA',
        alt: 'برنج طارم سوپر ممتاز بسته تست ۱ کیلوگرمی',
      },
      {
        id: 'lentils-500g',
        title: 'عدس قرمز اعلا دست‌چین',
        subtitle: 'پخت سریع و یکدست مناسب دال‌عدس فاخر',
        origin: 'سورتینگ لیزری دوبل',
        badge: '۵۰۰ گرم',
        price: '۸۸,۰۰۰',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuChmR0-DplXYcnANbrTVJiprJ6Ue_2NxSla68x2f---8zbs5-vHs5fjxmlgtkAEMOqaPdvVDtapMocSjboJp1QIqGyDIFqzjUyDkmJ3tiPGxUREP8HSGYdJ0hnu9LFZGD-M7T0SsgPHegAf9f4JXY1yGbG6bWwiHf8IrDIpCzAnWnKs1OOLfJjgl7OETqVA8rv5H43ticHoKc3SlG4gXpmu7MIJdJI5sP_hMDjGF5OBWaRKdWL88szi_IjiptyvQf6vyA',
        alt: 'عدس قرمز اعلا دست‌چین ۵۰۰ گرمی',
      },
      {
        id: 'chickpeas',
        title: 'نخود آبگوشتی صادراتی',
        subtitle: 'زودپز، بدون پوست‌پوست شدن و ترد',
        origin: 'دوخان کرمانشاه',
        badge: 'سایز ۸ و ۹',
        price: '۹۸,۰۰۰',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBgNRiJpKjh_NA7gI9NbaTVaCkOcZWcCVbiApAo0PwfitVqyzCZhLqoh4XDEpW0zj21gxYF6e1JtdDxOCCVFd-Ru1rLUK8UnUCtMnrkCUWEUr8bqq7W_ebbBWX3Uk5StOP9mWDRJLpBXkKkT5uCJ1_Wne9mHcwAqKfxTzO_Spvl-_H6-RuWRwvEaWz577vWHyQNS6Cq-nA5Q3_zqggrAW-osxINKt8gbqZDgl7GpOq0cHo7-HQbP2eoQun5_xsjjhDufA',
        alt: 'نخود آبگوشتی دوخان کرمانشاه',
      },
      {
        id: 'lentils-1kg',
        title: 'عدس قرمز اعلا ۱ کیلوگرمی',
        subtitle: 'بسته‌بندی زیپ‌کیپ حافظ عطر و کیفیت',
        origin: 'کشت دیم طبیعی',
        badge: '۱ کیلوگرم',
        price: '۱۶۵,۰۰۰',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA3ZBUiG6NwSbQ4srn2IooBflNf_bAT4_bO8lMTkr1AAMCBInhxeqJl65GGVWOmPZ61FJfNgFdpP7UN4v16X4P1P2beIeL06h8fpOYn_v2bhm-Tyw8ejSgm8NXcfPTq3iZAQCO4W3vwlwZ8Q2H9kLWcDGh-K9rr_Dtz0IUzYQf1KWIGkzkZBd1nzmEjBk319SK-9nG8No5yAe2Zf5xwm7ZfVMU5o4rNzKd3-sfb-c1XdT4Yz6ikG1VI38GjTA1OnTPcSw',
        alt: 'عدس قرمز ۱ کیلوگرمی ممتاز',
      },
    ],
  },
}

export function getProductDetailBySlug(_slug) {
  return mockProductDetail
}
