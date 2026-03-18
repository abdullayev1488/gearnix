import {
  IconUser,
  IconStar,
  IconSearch,
  IconBrandX,
  IconBrandTiktok,
  IconShoppingCart,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandVimeo,
  IconBrandYoutube,
} from "@tabler/icons-react";

export const socials = [
  {
    id: 1,
    Icon: IconBrandFacebook,
    path: "https://www.facebook.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
  {
    id: 2,
    Icon: IconBrandX,
    path: "https://x.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
  {
    id: 3,
    Icon: IconBrandVimeo,
    path: "https://vimeo.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
  {
    id: 4,
    Icon: IconBrandInstagram,
    path: "https://www.instagram.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
]

export const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Shop", path: "/shop" },
  { title: "Contact", path: "/contact" }
]

export const staticCategories = [
  {
    name: "Keyboards Gaming",
    img: "/img/img-2-1.png"
  },
  {
    name: "Gaming Mouse",
    img: "/img/img-2-2.png"
  },
  {
    name: "Headset Gaming",
    img: "/img/img-2-3.png"
  },
  {
    name: "Gaming Controllers",
    img: "/img/img-2-4.png"
  }
];

export const navIcons = [
  { Icon: IconSearch, name: "search" },
  { Icon: IconUser, name: "user" },
  { Icon: IconStar, name: "wishlist" },
  { Icon: IconShoppingCart, name: "basket" }
]

export const colors = [
  "linear-gradient(90deg, #A8FF78 48%, #78FFD6 100%)",
  "linear-gradient(90deg, #FF416C 0%, #FF4B2B 100%)",
  "linear-gradient(90deg, #B2FEFA 0%, #0ED2F7 100%)",
  "linear-gradient(90deg, #FFEFBA 0%, #DDEFBB 100%)",
]

export const collections = [
  {
    id: 1,
    title: "Primal",
    description: "Agis Quantum Headset",
    image: "/img/img-2-5.jpg",
  },
  {
    id: 2,
    title: "Precision",
    description: "Nighthawk Pro Gaming Mouse",
    image: "/img/img-2-6.jpg",
  },
  {
    id: 3,
    title: "Comfort",
    description: "Hydra Ergomic Keyboard",
    image: "/img/img-2-7.jpg",
  },
];

export const newsData = [
  {
    id: 1,
    author: "admin",
    date: "16th Nov 2022",
    title: "The Emerging Trend of Sleek and Stylish Gaming Gear Designs",
    image: "/img/blog9.webp"
  },
  {
    id: 2,
    author: "admin",
    date: "16th Nov 2022",
    title: "Essential Gear for Aspiring Content Creators and Streamers",
    image: "/img/blog8.webp"
  },
  {
    id: 3,
    author: "admin",
    date: "16th Nov 2022",
    title: "The Emerging Trend of Sleek and Stylish Gaming Gear Designs",
    image: "/img/blog7.webp"
  },
  {
    id: 4,
    author: "admin",
    date: "16th Nov 2022",
    title: "Great bulk recipes to help use all your organic produce",
    image: "/img/blog6.webp"
  },
];

export const advantages = [
  {
    id: 1,
    icon: "/img/icon-1.webp",
    title: "Free Shipping",
    description: "Free Shipping to Make Your Shopping Experience Seamless."
  },
  {
    id: 2,
    icon: "/img/icon-2.webp",
    title: "Return Policy",
    description: "Flexible Returns to Ensure a Positive Shopping Experience."
  },
  {
    id: 3,
    icon: "/img/icon-3.webp",
    title: "Save Money",
    description: "Shop Smarter and Save Big with Our Money-Saving Solutions."
  },
  {
    id: 4,
    icon: "/img/icon-4.webp",
    title: "Support 24/7",
    description: "Unparalleled Support, Tailored to Your Needs 24 Hours a Day."
  }
];

export const footerLinks = [
  {
    title: "Let Us Help",
    links: [
      { name: "Track My Order", path: "/track-order" },
      { name: "Cancel My Order", path: "/cancel-order" },
      { name: "Return My Order", path: "/return-order" },
      { name: "Search", path: "/search" }
    ]
  },
  {
    title: "Our Policies",
    links: [
      { name: "Shipping & Delivery", path: "/shipping-delivery" },
      { name: "Returns & Cancellations", path: "/returns-cancellations" },
      { name: "Terms & Conditions", path: "/terms-conditions" },
      { name: "Privacy Policy", path: "/privacy-policy" }
    ]
  },
  {
    title: "My Account",
    links: [
      { name: "Help and advice", path: "/help-advice" },
      { name: "Shipping & Returns", path: "/shipping-returns" },
      { name: "Terms and conditions", path: "/terms-conditions-account" },
      { name: "Refund Policy", path: "/refund-policy" }
    ]
  }
];

export const features = [
  {
    id: 1,
    icon: '/img/about1.svg',
    title: 'Choose A Theme',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget molestie purus.'
  },
  {
    id: 2,
    icon: '/img/about2.svg',
    title: 'Add Products',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget molestie purus.'
  },
  {
    id: 3,
    icon: '/img/about3.svg',
    title: 'Start Selling',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget molestie purus.'
  }
];

export const stores = [
  {
    id: 1,
    image: '/img/Store1.webp',
    city: 'Los Angeles',
    address: '3123 Canis Heights Drive, Marina, CA 90071'
  },
  {
    id: 2,
    image: '/img/Store2.webp',
    city: 'New York',
    address: '1904 James Street, Rochester, NY 14604'
  },
  {
    id: 3,
    image: '/img/Store3.webp',
    city: 'California',
    address: '3605 Martha Street, Phoenix, AZ 86040'
  }
];

export const videos = [
  { id: 1, img: '/img/VID1.webp' },
  { id: 2, img: '/img/VID2.webp' },
  { id: 3, img: '/img/VID3.webp' },
  { id: 4, img: '/img/VID4.webp' },
  { id: 5, img: '/img/VID5.webp' },
];

export const teamMembers = [
  { id: 1, name: "Christina M", role: "Creative Director", img: "/img/human1.webp" },
  { id: 2, name: "Alexander J", role: "Lead Designer", img: "/img/human2.webp" },
  { id: 3, name: "Sophia R", role: "Product Manager", img: "/img/human3.webp" },
  { id: 4, name: "Daniel K", role: "Senior Developer", img: "/img/human4.webp" },
  { id: 5, name: "Emma W", role: "UX Researcher", img: "/img/human5.webp" },
];

export const contactSocials = [
  {
    id: 1,
    Icon: IconBrandFacebook,
    path: "https://www.facebook.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
  {
    id: 2,
    Icon: IconBrandX,
    path: "https://x.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
  {
    id: 3,
    Icon: IconBrandVimeo,
    path: "https://vimeo.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
  {
    id: 4,
    Icon: IconBrandInstagram,
    path: "https://www.instagram.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
  {
    id: 5,
    Icon: IconBrandYoutube,
    path: "https://www.youtube.com/",
    color: "bg-gradient-to-r from-[#b851f5] to-[#f551b8]",
  },
];

export const sortOptions = [
  { label: 'Default sorting', value: 'default' },
  { label: 'Sort by high rating', value: 'rating' },
  { label: 'Sort by low rating', value: 'latest' },
  { label: 'Sort by price: low to high', value: 'price-low' },
  { label: 'Sort by price: high to low', value: 'price-high' },
];