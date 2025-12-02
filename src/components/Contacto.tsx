import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="pt-60 pb-40 min-h-[120vh] h-screen scroll-mt-25 bg-linear-to-b from-white via-gray-50 to-carabinero-green-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-carabinero-gold-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-carabinero-green-100 text-carabinero-green-700 rounded-full text-sm font-semibold mb-4">
            CONTÁCTANOS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-carabinero-green-800 to-carabinero-green-600 bg-clip-text text-transparent mb-4">
            Contacto
          </h2>
          <p className="text-xl text-gray-600">Estamos aquí para servirte y protegerte</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h3 className="text-2xl font-bold text-carabinero-green-800 mb-6">Información de Contacto</h3>
            <div className="space-y-6">
              <div className="flex items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-carabinero-green-100">
                <div className="text-carabinero-gold-600 text-3xl mr-4">📍</div>
                <div>
                  <h4 className="font-semibold text-carabinero-green-800 mb-1">Dirección</h4>
                  <p className="text-gray-600">General Borgoño 1204, Independencia, Santiago, Chile</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-carabinero-green-100">
                <div className="text-carabinero-gold-600 text-3xl mr-4">📧</div>
                <div>
                  <h4 className="font-semibold text-carabinero-green-800 mb-1">Email</h4>
                  <p className="text-gray-600">contacto@dinaoperpol.cl</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-carabinero-green-100">
                <div className="text-carabinero-gold-600 text-3xl mr-4">📱</div>
                <div>
                  <h4 className="font-semibold text-carabinero-green-800 mb-1">Teléfono</h4>
                  <p className="text-gray-600">+56 2 2927 0000</p>
                  <p className="text-sm text-carabinero-gold-600 font-semibold mt-1">Emergencias: 133</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-carabinero-green-100">
                <div className="text-carabinero-gold-600 text-3xl mr-4">🕐</div>
                <div>
                  <h4 className="font-semibold text-carabinero-green-800 mb-1">Horario de Atención</h4>
                  <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-gray-500 mt-1">Atención de emergencias 24/7</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-br from-carabinero-green-700 to-carabinero-green-800 p-6 rounded-xl shadow-xl">
              <h4 className="font-semibold text-carabinero-gold-300 mb-4">Síguenos en Redes Sociales</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-all hover:scale-110 transform">
                  <span className="text-2xl">📘</span>
                </a>
                <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-all hover:scale-110 transform">
                  <span className="text-2xl">🐦</span>
                </a>
                <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-all hover:scale-110 transform">
                  <span className="text-2xl">�</span>
                </a>
                <a href="#" className="bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-all hover:scale-110 transform">
                  <span className="text-2xl">▶️</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-carabinero-green-100">
            <h3 className="text-2xl font-bold text-carabinero-green-800 mb-6">Envíanos un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-carabinero-green-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-carabinero-gold-500 focus:border-carabinero-green-500 transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-carabinero-green-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-carabinero-gold-500 focus:border-carabinero-green-500 transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-carabinero-green-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-carabinero-gold-500 focus:border-carabinero-green-500 transition-all"
                  placeholder="+56 9 1234 5678"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-carabinero-green-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-carabinero-gold-500 focus:border-carabinero-green-500 transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-carabinero-green-700 to-carabinero-green-800 text-white py-4 rounded-lg font-bold hover:from-carabinero-green-600 hover:to-carabinero-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Enviar Mensaje
              </button>
              <p className="text-sm text-gray-500 text-center">* Campos obligatorios</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
