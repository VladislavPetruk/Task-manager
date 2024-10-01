export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="p-3 text-center">
      <span>©{copyrightYear}. All rights reserved.</span>
    </footer>
  );
};
