(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function c(i){let s=0;const r=o=>{s=o,i.innerHTML=`count is ${s}`};i.addEventListener("click",()=>r(s+1)),r(0)}document.querySelector("#app").innerHTML=`
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
`;c(document.querySelector("#counter"));
