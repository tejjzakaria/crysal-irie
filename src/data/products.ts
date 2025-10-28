export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  description: string;
  longDescription?: string;
  featured?: boolean;
  options?: {
    label: string;
    price: string;
    highlighted?: boolean;
  }[];
}

export const products: Product[] = [
  {
    id: "dragon-flower-oil",
    name: "زيت زهرة التنين",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/products/zDtlyXoZPAOUNHuiylVeSOfs7fX12Ph9JECmtNmS_md.jpg",
    price: "199 د.م",
    oldPrice: "350 د.م",
    discount: "43%",
    description: "زيت فرموني طبيعي بعطر ساحر",
    longDescription: "زيت زهرة التنين الفرموني الفاخر - تركيبة طبيعية 100% بعطر ساحر يدوم طويلاً. يعزز الثقة ويترك انطباعاً لا يُنسى. مناسب لجميع أنواع البشرة.",
  },
  {
    id: "rose-oil",
    name: "زيت الورد",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/products/t6UbpfDWv4m1SoFu4VYha6H0sDSvJnbz2OYb47uY.webp",
    price: "199 د.م",
    oldPrice: "350 د.م",
    discount: "43%",
    description: "زيت الورد الطبيعي الفاخر",
    longDescription: "زيت الورد الطبيعي المستخرج من أجود أنواع الورود. يمنح بشرتك نعومة فائقة ورائحة عطرة تدوم طوال اليوم. غني بالفيتامينات والمغذيات الطبيعية.",
  },
  {
    id: "pheromone-body-oil",
    name: "زيت الجسم الفرموني",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/products/NgIl99zuXaw0Ywlh2gFCWbrG8tkjnIKfPXMmtaBA_md.jpg",
    price: "199 د.م",
    oldPrice: "360 د.م",
    discount: "45%",
    description: "زيت جسم بخلاصات طبيعية",
    longDescription: "زيت الجسم الفرموني الفاخر بتركيبة فريدة من الزيوت الطبيعية. يجذب الانتباه ويعزز جاذبيتك الطبيعية. سريع الامتصاص ولا يترك أثراً دهنياً.",
  },
  {
    id: "crystal-bundle",
    name: "مجموعة كريستال | عرض محدود",
    image: "https://cdn.youcan.shop/stores/64475bdccb2dbd1214f1654dd9d89f00/products/XPZb8eRSipQu9aGFBRQ6xtHamVbGzAUqHyzGuPt8.jpg",
    price: "399 د.م",
    oldPrice: "690 د.م",
    discount: "42%",
    description: "4 زجاجات بأحجام مختلفة",
    longDescription: "مجموعة كاملة من زيوت Crystalirie الفاخرة. احصلي على 4 زجاجات من زيوتنا المميزة بسعر خاص. عرض محدود لفترة محدودة!",
    featured: true,
    options: [
      {
        label: "4 زجاجات (15مل) ب 199 درهم 🎀",
        price: "199 د.م",
      },
      {
        label: "4 زجاجات (30مل) ب 299 درهم 🤯",
        price: "299 د.م",
      },
      {
        label: "4 زجاجات (118مل) بـ 399 درهم فقط 😱",
        price: "399 د.م",
        highlighted: true,
      },
    ],
  },
];
