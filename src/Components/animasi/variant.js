// --- Animasi Mobile Menu ---
export const mobileMenuVariants = {
  hidden: { opacity: 0, y: -15, scale: 0.95, filter: "blur(10px)" },
  visible: { 
    opacity: 1, y: 8, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 400, damping: 30, staggerChildren: 0.05, delayChildren: 0.05 } 
  },
  exit: { opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.2, ease: "easeInOut" } }
};

export const mobileItemVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(5px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// --- Konfigurasi Efek Liquid Desktop (Anti Patah-Patah) ---
export const liquidTransition = {
  type: "spring",
  bounce: 0.2, // Bikin efek membal yang natural
  duration: 0.6
};

// --- Animasi Teks Desktop ---
export const desktopTextVariants = {
  hidden: { opacity: 0, width: 0, marginLeft: 0 },
  visible: { opacity: 1, width: "auto", marginLeft: 8 }
};