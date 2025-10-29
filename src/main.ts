import './input.css'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="min-h-screen bg-red-50">
    <nav class="bg-red-800 text-white p-4">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold">Super Carnes García</h1>
      </div>
    </nav>
    
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-3xl font-bold text-red-800 mb-4">Bienvenidos a nuestra carnicería</h2>
        <p class="text-gray-600 mb-4">La mejor calidad en carnes para su mesa</p>
        <div class="flex justify-center">
          <button id="counter" type="button" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"></button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-red-800 mb-2">Carnes Frescas</h3>
          <p class="text-gray-600">La mejor selección de cortes frescos</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-red-800 mb-2">Especialidades</h3>
          <p class="text-gray-600">Cortes especiales y preparados</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-red-800 mb-2">Ofertas</h3>
          <p class="text-gray-600">Descuentos especiales de la semana</p>
        </div>
      </div>
    </main>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
