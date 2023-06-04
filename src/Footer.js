function Footer() {
  return (
    <footer className="bg-custom-blue flex justify-center">
      <div className="py-20 text-custom-white flex flex-col gap-8 lg:flex-row lg:gap-20 lg:justify-center">
        <div>
          <p className="text-4xl">Sākums</p>
          <p>Par mums</p>
          <p>Privātums</p>
          <p>Noteikumi</p>
        </div>
        <div>
          <p className="text-4xl">Sekot</p>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>LinkedIn</p>
        </div>
        <div>
          <p className="text-4xl">Kontakti</p>
          <p>+371 28 111 111</p>
          <p>info@karlitis.lv</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
