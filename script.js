
const money=v=>Number(String(v).replace(',','.'));let cart=JSON.parse(localStorage.getItem('cart')||'[]');function save(){localStorage.setItem('cart',JSON.stringify(cart));renderCart()}function addCart(slug,name,price,img){let it=cart.find(x=>x.slug===slug);if(it)it.qtd++;else cart.push({slug,name,price,img,qtd:1});save();openCart()}function renderCart(){const el=document.querySelector('.cartItems');const count=document.querySelector('.cartCount');const total=document.querySelector('.cartTotal');if(!el)return;el.innerHTML=cart.map((i,idx)=>`<div class="cartItem"><img src="${i.img}"><div><b>${i.name}</b><br><small>Qtd ${i.qtd}</small></div><button onclick="cart.splice(${idx},1);save()">x</button></div>`).join('')||'<p>Seu carrinho está vazio.</p>';let t=cart.reduce((s,i)=>s+money(i.price)*i.qtd,0);count&&(count.textContent=cart.reduce((s,i)=>s+i.qtd,0));total&&(total.textContent=t.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}))}function openCart(){document.querySelector('.drawer')?.classList.add('open')}function closeCart(){document.querySelector('.drawer')?.classList.remove('open')}function goCheckout(){if(!cart.length){alert('Escolha um presente primeiro.');return}var p=location.pathname||'/';if(/\/index\.html$/i.test(p))p=p.replace(/index\.html$/i,'');else if(!/\/$/.test(p)){if(/\.html?$/i.test(p))p=p.replace(/[^/]+$/,'');else p=p+'/';}if(p.slice(-1)!=='/')p+='/';location.href=p+'checkout.html'}function filterCat(cat,btn){document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.catBlock').forEach(s=>s.style.display=(cat==='Todos'||s.dataset.cat===cat)?'block':'none')}document.addEventListener('DOMContentLoaded',function(){renderCart();try{const params=new URLSearchParams(location.search);const cat=params.get('cat');if(cat){const btn=Array.from(document.querySelectorAll('.filter')).find(b=>b.textContent.trim().toLowerCase()===cat.toLowerCase());if(btn){filterCat(cat.charAt(0).toUpperCase()+cat.slice(1),btn);setTimeout(()=>{document.getElementById('produtos')?.scrollIntoView({behavior:'smooth',block:'start'})},300)}}}catch(e){}});


const PRODUCTS_DATA = [{"slug":"cafe-da-manha","name":"Café da Manhã Completo","price":"87,21","img":"produtos/cafe-completo01.webp","cat":"Café da manhã com carinho","items":["Cesta/bandeja decorada premium","Pães e torradas selecionados","Biscoitos, bolinhos e itens de café","Sachês de café, cappuccino ou achocolatado","Suco/néctar individual conforme disponibilidade","Geleia, manteiga ou patê individual","Chocolate ou mimo doce","Cartão personalizado com mensagem"],"brands":["Bauducco ou similar","Nestlé/3 Corações ou similar","Del Valle/Maguary ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"96,90"},{"slug":"cafe-na-cama-premium","name":"Café na Cama Premium","price":"135,81","img":"produtos/cafe-premium02.webp","cat":"Café da manhã com carinho","items":["Cesta/bandeja decorada premium","Pães e torradas selecionados","Biscoitos, bolinhos e itens de café","Sachês de café, cappuccino ou achocolatado","Suco/néctar individual conforme disponibilidade","Geleia, manteiga ou patê individual","Chocolate ou mimo doce","Cartão personalizado com mensagem"],"brands":["Bauducco ou similar","Nestlé/3 Corações ou similar","Del Valle/Maguary ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"150,90"},{"slug":"cafe-da-manha-romantico","name":"Café da Manhã Romântico","price":"99,81","img":"produtos/cafe-romantico.webp","cat":"Café da manhã com carinho","items":["Cesta/bandeja decorada premium","Pães e torradas selecionados","Biscoitos, bolinhos e itens de café","Sachês de café, cappuccino ou achocolatado","Suco/néctar individual conforme disponibilidade","Geleia, manteiga ou patê individual","Chocolate ou mimo doce","Cartão personalizado com mensagem"],"brands":["Bauducco ou similar","Nestlé/3 Corações ou similar","Del Valle/Maguary ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"110,90"},{"slug":"cafe-especial-da-casa","name":"Café Especial da Casa","price":"197,91","img":"produtos/cafe-especial.webp","cat":"Café da manhã com carinho","items":["Cesta/bandeja decorada premium","Pães e torradas selecionados","Biscoitos, bolinhos e itens de café","Sachês de café, cappuccino ou achocolatado","Suco/néctar individual conforme disponibilidade","Geleia, manteiga ou patê individual","Chocolate ou mimo doce","Cartão personalizado com mensagem"],"brands":["Bauducco ou similar","Nestlé/3 Corações ou similar","Del Valle/Maguary ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"219,90"},{"slug":"rosas-vermelhas-12","name":"Rosas Vermelhas — 12 unidades","price":"123,21","img":"produtos/rosas-vermelhas.webp","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"136,90"},{"slug":"mix-flores-coloridas","name":"Mix de Flores Coloridas","price":"148,41","img":"produtos/mix-flores.webp","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"164,90"},{"slug":"buque-rosas-brancas-6","name":"Buquê de Rosas Brancas — 6 Unidades","price":"99,81","img":"produtos/rosas-brancas.webp","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"110,90"},{"slug":"girassois-5","name":"Girassóis — 5 unidades","price":"84,51","img":"produtos/girassois.webp","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"93,90"},{"slug":"cesta-queijos-chocolate","name":"Cesta Cura TPM","price":"134,91","img":"produtos/p-cesta-queijos-DK0mVwVX.jpg","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Queijos, frios ou petiscos selecionados","Chocolates e mimos gourmet","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Polenghi/President ou similar","Ferrero/Lacta/Nestlé ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"149,90"},{"slug":"cesta-flores-mimos","name":"Cesta Flores & Mimos","price":"197,91","img":"produtos/cesta-flores-mimos.webp","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"219,90"},{"slug":"cesta-queijos-frios-selecionados","name":"Cesta Queijos & Frios Selecionados","price":"179,91","img":"produtos/p-cesta-queijos-DK0mVwVX.jpg","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Queijos, frios ou petiscos selecionados","Chocolates e mimos gourmet","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Polenghi/President ou similar","Ferrero/Lacta/Nestlé ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"199,90"},{"slug":"cesta-aniversario","name":"Cesta de Aniversário","price":"185,31","img":"produtos/p-cesta-aniversario-Dq4AcS0w.jpg","cat":"Café da manhã com carinho","items":["Cesta artesanal decorada","Itens gourmet selecionados conforme foto","Chocolates e mimos especiais","Laço decorativo premium","Cartão de mensagem personalizado","Embalagem pronta para presente"],"brands":["Marcas selecionadas do dia","Lacta/Nestlé/Garoto ou similar","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"205,90"},{"slug":"cesta-gourmet-premium-queijos","name":"Cesta Gourmet Premium","price":"251,91","img":"produtos/1781443599.webp","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Queijos, frios ou petiscos selecionados","Chocolates e mimos gourmet","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Polenghi/President ou similar","Ferrero/Lacta/Nestlé ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"279,90"},{"slug":"cesta-morangos-chocolate","name":"Cesta Morangos & Chocolate","price":"233,91","img":"produtos/1781444210.webp","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Queijos, frios ou petiscos selecionados","Chocolates e mimos gourmet","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Polenghi/President ou similar","Ferrero/Lacta/Nestlé ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"259,90"},{"slug":"cesta-feliz-aniversario","name":"Cesta Feliz Aniversário","price":"222,21","img":"produtos/1781445369.webp","cat":"Café da manhã com carinho","items":["Cesta artesanal decorada","Itens gourmet selecionados conforme foto","Chocolates e mimos especiais","Laço decorativo premium","Cartão de mensagem personalizado","Embalagem pronta para presente"],"brands":["Marcas selecionadas do dia","Lacta/Nestlé/Garoto ou similar","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"246,90"},{"slug":"cesta-ferrero-rocher","name":"Cesta Ferrero Rocher","price":"173,61","img":"produtos/p-cesta-ferrero-We-RR6UX.jpg","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Chocolates variados selecionados","Bombons Ferrero Rocher quando indicado","Lindt/Godiva quando indicado na composição","Laço de cetim","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Ferrero Rocher","Lindt/Godiva quando indicado","Lacta/Nestlé/Garoto ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"192,90"},{"slug":"cesta-chocolate","name":"Cesta Chocolate","price":"123,21","img":"produtos/p-cesta-chocolate-CUZRosl0.jpg","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Chocolates variados selecionados","Bombons Ferrero Rocher quando indicado","Lindt/Godiva quando indicado na composição","Laço de cetim","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Ferrero Rocher","Lindt/Godiva quando indicado","Lacta/Nestlé/Garoto ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"136,90"},{"slug":"festival-chocolates-importados","name":"Cesta Festival de Chocolates Importados","price":"246,51","img":"produtos/1781444305.webp","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Chocolates variados selecionados","Bombons Ferrero Rocher quando indicado","Lindt/Godiva quando indicado na composição","Laço de cetim","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Ferrero Rocher","Lindt/Godiva quando indicado","Lacta/Nestlé/Garoto ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"273,90"},{"slug":"premium-lindt-godiva-ferrero","name":"Cesta Premium Lindt, Godiva & Ferrero","price":"332,91","img":"produtos/1781445714.webp","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Chocolates variados selecionados","Bombons Ferrero Rocher quando indicado","Lindt/Godiva quando indicado na composição","Laço de cetim","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Ferrero Rocher","Lindt/Godiva quando indicado","Lacta/Nestlé/Garoto ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"369,90"},{"slug":"cesta-luxo-romantica","name":"Cesta Luxo Romântica","price":"135,81","img":"produtos/p-luxo-romantica-DOyiMCdt.jpg","cat":"Café da manhã com carinho","items":["Cesta artesanal decorada","Itens gourmet selecionados conforme foto","Chocolates e mimos especiais","Laço decorativo premium","Cartão de mensagem personalizado","Embalagem pronta para presente"],"brands":["Marcas selecionadas do dia","Lacta/Nestlé/Garoto ou similar","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"150,90"},{"slug":"cesta-amor-doce","name":"Cesta Amor Doce","price":"106,11","img":"produtos/p-amor-doce-C2ZXWtbJ.jpg","cat":"Café da manhã com carinho","items":["Cesta artesanal decorada","Itens gourmet selecionados conforme foto","Chocolates e mimos especiais","Laço decorativo premium","Cartão de mensagem personalizado","Embalagem pronta para presente"],"brands":["Marcas selecionadas do dia","Lacta/Nestlé/Garoto ou similar","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"117,90"},{"slug":"ursinho-buque-ferrero","name":"Ursinho, Buquê e Ferrero","price":"135,81","img":"produtos/p-ursinho-buque-rAtLrFK6.jpg","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro","Bombons Ferrero Rocher"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"150,90"},{"slug":"cesta-te-amo-especial","name":"Cesta Te Amo Especial","price":"234,81","img":"produtos/1781444537.webp","cat":"Café da manhã com carinho","items":["Cesta artesanal decorada","Itens gourmet selecionados conforme foto","Chocolates e mimos especiais","Laço decorativo premium","Cartão de mensagem personalizado","Embalagem pronta para presente"],"brands":["Marcas selecionadas do dia","Lacta/Nestlé/Garoto ou similar","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"260,90"},{"slug":"cesta-i-love-you-deluxe","name":"Cesta I Love You Deluxe","price":"246,51","img":"produtos/1781445875.webp","cat":"Café da manhã com carinho","items":["Cesta artesanal decorada","Itens gourmet selecionados conforme foto","Chocolates e mimos especiais","Laço decorativo premium","Cartão de mensagem personalizado","Embalagem pronta para presente"],"brands":["Marcas selecionadas do dia","Lacta/Nestlé/Garoto ou similar","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"273,90"},{"slug":"ursinho-buque-ferrero-2","name":"Ursinho com Buquê & Ferrero","price":"148,41","img":"produtos/p-ursinho-buque-rAtLrFK6.jpg","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro","Bombons Ferrero Rocher"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"164,90"},{"slug":"cesta-love-chocolates","name":"Cesta Love Chocolates Variados","price":"197,91","img":"produtos/1781445567.webp","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Chocolates variados selecionados","Bombons Ferrero Rocher quando indicado","Lindt/Godiva quando indicado na composição","Laço de cetim","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Ferrero Rocher","Lindt/Godiva quando indicado","Lacta/Nestlé/Garoto ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"219,90"},{"slug":"cesta-mini-caneca","name":"Cesta Mini com Caneca","price":"55,71","img":"produtos/p-mini-caneca-C_DkdhcN.jpg","cat":"Café da manhã com carinho","items":["Cesta artesanal decorada","Itens gourmet selecionados conforme foto","Chocolates e mimos especiais","Laço decorativo premium","Cartão de mensagem personalizado","Embalagem pronta para presente"],"brands":["Marcas selecionadas do dia","Lacta/Nestlé/Garoto ou similar","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"61,90"},{"slug":"ursinho-ferrero","name":"Ursinho + Ferrero","price":"50,31","img":"produtos/p-ursinho-ferrero-DL0MfFhX.jpg","cat":"Café da manhã com carinho","items":["Ursinho de pelúcia macio","Embalagem decorada para presente","Laço de cetim","Cartão personalizado com mensagem","Chocolates ou mimos conforme composição da foto"],"brands":["Pelúcia antialérgica/similar","Ferrero Rocher quando indicado","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"55,90"},{"slug":"caixinha-lindt-ferrero","name":"Caixinha Lindt & Ferrero","price":"37,71","img":"produtos/p-caixinha-lindt-DYdnL_U9.jpg","cat":"Café da manhã com carinho","items":["Cesta decorada premium","Chocolates variados selecionados","Bombons Ferrero Rocher quando indicado","Lindt/Godiva quando indicado na composição","Laço de cetim","Cartão personalizado com mensagem","Embalagem pronta para presente"],"brands":["Ferrero Rocher","Lindt/Godiva quando indicado","Lacta/Nestlé/Garoto ou similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"41,90"},{"slug":"rosas-nutella","name":"Rosas com Nutella","price":"68,31","img":"produtos/p-rosas-nutella-DPXSaEY2.jpg","cat":"Café da manhã com carinho","items":["Flores naturais selecionadas do dia","Papel decorativo floral premium","Laço de cetim","Acabamento de floricultura","Cartão personalizado com mensagem","Embalagem para transporte seguro","Nutella ou creme de avelã similar"],"brands":["Rosas/Girassóis naturais","Laço cetim premium","Papel floral importado/similar"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"75,90"},{"slug":"urso-grande-50cm","name":"Urso Grande 50cm","price":"87,21","img":"produtos/p-urso-grande-CIylZfUA.jpg","cat":"Café da manhã com carinho","items":["Ursinho de pelúcia macio","Embalagem decorada para presente","Laço de cetim","Cartão personalizado com mensagem","Chocolates ou mimos conforme composição da foto"],"brands":["Pelúcia antialérgica/similar","Ferrero Rocher quando indicado","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"96,90"},{"slug":"urso-medio-30cm","name":"Urso Médio 30cm","price":"44,01","img":"produtos/p-urso-medio-BZ9SSdV5.jpg","cat":"Café da manhã com carinho","items":["Ursinho de pelúcia macio","Embalagem decorada para presente","Laço de cetim","Cartão personalizado com mensagem","Chocolates ou mimos conforme composição da foto"],"brands":["Pelúcia antialérgica/similar","Ferrero Rocher quando indicado","Laço cetim premium"],"details":"Composição baseada na foto do produto. Itens podem variar por disponibilidade mantendo o mesmo padrão de valor, beleza e qualidade.","priceOld":"48,90"},{"slug":"porta-retrato-te-amo-pra-sempre","name":"Porta Retrato Te Amo Pra Sempre","price":"38,61","img":"produtos/porta-retrato-te-amo-pra-sempre.webp","cat":"Porta retrato personalizado","items":["Porta retrato decorativo com arte personalizada","Impressão da foto enviada pelo cliente","Moldura preta elegante conforme referência","Acabamento pronto para presente","Embalagem de proteção para entrega","Personalização com nome/frase conforme modelo"],"brands":["Personalização Bella Aurora","Moldura decorativa premium","Foto enviada pelo cliente"],"details":"Produto personalizado. Envie a foto no botão abaixo para usarmos na arte do porta retrato.","needPhoto":true,"priceOld":"42,90"},{"slug":"porta-retrato-casal-urbano","name":"Porta Retrato Casal Urbano","price":"40,41","img":"produtos/porta-retrato-casal-urbano.webp","cat":"Porta retrato personalizado","items":["Porta retrato decorativo com arte personalizada","Impressão da foto enviada pelo cliente","Moldura preta elegante conforme referência","Acabamento pronto para presente","Embalagem de proteção para entrega","Personalização com nome/frase conforme modelo"],"brands":["Personalização Bella Aurora","Moldura decorativa premium","Foto enviada pelo cliente"],"details":"Produto personalizado. Envie a foto no botão abaixo para usarmos na arte do porta retrato.","needPhoto":true,"priceOld":"44,90"},{"slug":"porta-retrato-encanto-casal","name":"Porta Retrato Encanto Casal","price":"42,21","img":"produtos/porta-retrato-encanto-casal.webp","cat":"Porta retrato personalizado","items":["Porta retrato decorativo com arte personalizada","Impressão da foto enviada pelo cliente","Moldura preta elegante conforme referência","Acabamento pronto para presente","Embalagem de proteção para entrega","Personalização com nome/frase conforme modelo"],"brands":["Personalização Bella Aurora","Moldura decorativa premium","Foto enviada pelo cliente"],"details":"Produto personalizado. Envie a foto no botão abaixo para usarmos na arte do porta retrato.","needPhoto":true,"priceOld":"46,90"},{"slug":"porta-retrato-pet-love","name":"Porta Retrato Pet Love","price":"44,01","img":"produtos/porta-retrato-pet-love.webp","cat":"Porta retrato personalizado","items":["Porta retrato decorativo com arte personalizada","Impressão da foto enviada pelo cliente","Moldura preta elegante conforme referência","Acabamento pronto para presente","Embalagem de proteção para entrega","Personalização com nome/frase conforme modelo"],"brands":["Personalização Bella Aurora","Moldura decorativa premium","Foto enviada pelo cliente"],"details":"Produto personalizado. Envie a foto no botão abaixo para usarmos na arte do porta retrato.","needPhoto":true,"priceOld":"48,90"},{"slug":"porta-retrato-amor-divertido","name":"Porta Retrato Amor Divertido","price":"44,91","img":"produtos/porta-retrato-amor-divertido.webp","cat":"Porta retrato personalizado","items":["Porta retrato decorativo com arte personalizada","Impressão da foto enviada pelo cliente","Moldura preta elegante conforme referência","Acabamento pronto para presente","Embalagem de proteção para entrega","Personalização com nome/frase conforme modelo"],"brands":["Personalização Bella Aurora","Moldura decorativa premium","Foto enviada pelo cliente"],"details":"Produto personalizado. Envie a foto no botão abaixo para usarmos na arte do porta retrato.","needPhoto":true,"priceOld":"49,90"},{"slug":"pelucia-stitch-17cm","name":"Pelúcia Stitch 17 cm","price":"52,11","img":"pelucia/StitchUrso.webp","cat":"Pelúcias","items":["Pelúcia macia e antialérgica","Tamanho médio de 17 cm","Acabamento delicado para presente","Embalagem protetora","Cartão personalizado com mensagem"],"brands":["Pelúcia premium","Acabamento selecionado"],"details":"Pelúcia no tamanho médio de 17 cm. É possível escolher a variação maior de 32 cm nas opções do produto.","priceOld":"57,90"},{"slug":"pelucia-leao-17cm","name":"Pelúcia Leão 17 cm","price":"52,11","img":"pelucia/leaourso.webp","cat":"Pelúcias","items":["Pelúcia macia e antialérgica","Tamanho médio de 17 cm","Acabamento delicado para presente","Embalagem protetora","Cartão personalizado com mensagem"],"brands":["Pelúcia premium","Acabamento selecionado"],"details":"Pelúcia no tamanho médio de 17 cm. É possível escolher a variação maior de 32 cm nas opções do produto.","priceOld":"57,90"},{"slug":"pelucia-urso-03-17cm","name":"Ursinho Carinhoso 17 cm","price":"50,31","img":"pelucia/urso03.png","cat":"Pelúcias","items":["Pelúcia macia e antialérgica","Tamanho médio de 17 cm","Acabamento delicado para presente","Embalagem protetora","Cartão personalizado com mensagem"],"brands":["Pelúcia premium","Acabamento selecionado"],"details":"Pelúcia no tamanho médio de 17 cm. É possível escolher a variação maior de 32 cm nas opções do produto.","priceOld":"55,90"},{"slug":"pelucia-urso-04-17cm","name":"Urso Clássico 17 cm","price":"55,71","img":"pelucia/urso04.webp","cat":"Pelúcias","items":["Pelúcia macia e antialérgica","Tamanho médio de 17 cm","Acabamento delicado para presente","Embalagem protetora","Cartão personalizado com mensagem"],"brands":["Pelúcia premium","Acabamento selecionado"],"details":"Pelúcia no tamanho médio de 17 cm. É possível escolher a variação maior de 32 cm nas opções do produto.","priceOld":"61,90"},{"slug":"pelucia-capivara-17cm","name":"Pelúcia Capivara 17 cm","price":"52,11","img":"pelucia/capvara .webp","cat":"Pelúcias","items":["Pelúcia macia e antialérgica","Tamanho médio de 17 cm","Acabamento delicado para presente","Embalagem protetora","Cartão personalizado com mensagem"],"brands":["Pelúcia premium","Acabamento selecionado"],"details":"Pelúcia no tamanho médio de 17 cm. É possível escolher a variação maior de 32 cm nas opções do produto.","priceOld":"57,90"},{"slug":"urso-gigante-1-metro","name":"Urso Gigante 1 Metro","price":"187,11","img":"pelucia/urso1metro .webp","cat":"Pelúcias","items":["Urso de pelúcia gigante com 1 metro","Toque macio e acabamento premium","Embalagem protetora para entrega","Cartão personalizado com mensagem"],"brands":["Pelúcia premium","Acabamento selecionado"],"details":"Modelo gigante de 1 metro com valor único de R$ 179,00.","priceOld":"207,90"},{"slug":"torta-chocolate-framboesas","name":"Torta Chocolate com Framboesas","price":"165,51","img":"tortas/torta-chocolate-framboesas.jpg","cat":"Bolos artesanais","items":["Massa de chocolate macia e úmida","Recheio cremoso de chocolate","Cobertura de ganache de chocolate","Finalização com framboesas frescas","Acabamento artesanal premium","Produzida sob encomenda"],"brands":["Chocolate selecionado","Framboesas frescas","Confeitaria artesanal"],"details":"Chocolate intenso equilibrado com a leve acidez das framboesas. Manter refrigerada e consumir preferencialmente em até 72 horas.","weightOptions":[["700 g","185,71","206,34"],["1 kg","226,49","251,66"],["1,5 kg","305,80","339,78"],["2 kg","385,13","427,92"]],"priceOld":"183,90"},{"slug":"torta-cookies-cream","name":"Torta Cookies & Cream","price":"161,91","img":"tortas/torta-cookies-cream.jpg","cat":"Bolos artesanais","items":["Massa de chocolate macia","Recheio cremoso Cookies & Cream","Cobertura de chantininho","Ganache de chocolate com acabamento drip","Decoração com biscoitos de chocolate","Produzida sob encomenda"],"brands":["Cookies de chocolate tipo Oreo","Chocolate selecionado","Confeitaria artesanal"],"details":"Combinação cremosa de chocolate, baunilha e cookies crocantes. Manter refrigerada e consumir preferencialmente em até 72 horas.","weightOptions":[["700 g","182,16","202,40"],["1 kg","222,04","246,71"],["1,5 kg","301,78","335,31"],["2 kg","375,82","417,58"]],"priceOld":"179,90"},{"slug":"torta-floresta-negra","name":"Torta Floresta Negra Premium","price":"163,71","img":"tortas/torta-floresta-negra.jpg","cat":"Bolos artesanais","items":["Massa de chocolate macia e úmida","Recheio cremoso com chantilly","Cobertura leve e aveludada","Lâminas de chocolate meio amargo","Decoração com cerejas","Produzida sob encomenda"],"brands":["Chocolate meio amargo","Cerejas selecionadas","Confeitaria artesanal"],"details":"Um clássico com chocolate, creme leve e cerejas, finalizado com lâminas crocantes. Manter refrigerada e consumir preferencialmente em até 72 horas.","weightOptions":[["700 g","183,93","204,37"],["1 kg","224,84","249,82"],["1,5 kg","304,35","338,17"],["2 kg","380,48","422,76"]],"priceOld":"181,90"},{"slug":"torta-baunilha-caramelo","name":"Torta Baunilha com Caramelo","price":"159,21","img":"tortas/torta-baunilha-caramelo.jpg","cat":"Bolos artesanais","items":["Massa amanteigada de baunilha","Recheio cremoso de doce de leite","Cobertura de chantininho premium","Calda de caramelo artesanal","Acabamento delicado em degradê","Produzida sob encomenda"],"brands":["Baunilha selecionada","Caramelo artesanal","Confeitaria artesanal"],"details":"Sabor delicado de baunilha com recheio cremoso e toque marcante de caramelo. Manter refrigerada e consumir preferencialmente em até 72 horas.","weightOptions":[["700 g","179,51","199,46"],["1 kg","217,26","241,40"],["1,5 kg","291,62","324,02"],["2 kg","365,99","406,66"]],"priceOld":"176,90"},{"slug":"torta-ninho-morangos","name":"Torta Ninho Supremo com Morangos","price":"165,60","img":"tortas/torta-ninho-morangos.jpg","cat":"Bolos artesanais","items":["Massa amanteigada de baunilha","Recheio cremoso sabor leite em pó","Cobertura aveludada sabor Ninho","Finalização com morangos frescos","Detalhes de chocolate branco e ao leite","Produzida sob encomenda"],"brands":["Leite em pó selecionado","Morangos frescos","Confeitaria artesanal"],"details":"Creme suave de leite em pó com morangos frescos e toques de chocolate. Manter refrigerada e consumir preferencialmente em até 72 horas.","weightOptions":[["700 g","185,80","206,44"],["1 kg","229,86","255,40"],["1,5 kg","311,43","346,03"],["2 kg","390,74","434,16"]],"priceOld":"184,00"}];
const ADDON_GROUPS_BY_TYPE = {
  default: [
    {section:"ADICIONAIS ESPECIAIS",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["embalagem-luxo","Embalagem luxo","11,61"],
      ["ferrero-extra","Ferrero Rocher extra","17,01"],
      ["mini-buque","Mini buquê decorativo","26,91"]
    ]}
  ],
  cafe: [
    {section:"ITENS PARA O CAFÉ",limit:"Até 7",items:[
      ["cafe-premium","Café premium (Nescafé Gold)","17,91"],
      ["croissant","Croissant","7,11"],
      ["pao-queijo","Pão de queijo (porção)","13,41"],
      ["mini-bolo","Mini bolo caseiro","17,91"],
      ["cupcake","Cupcake gourmet","11,61"],
      ["frutas-extras","Frutas extras","11,61"],
      ["suco-integral","Suco integral","13,41"]
    ]},
    {section:"ADICIONAIS ESPECIAIS",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["embalagem-luxo","Embalagem luxo","11,61"]
    ]}
  ],
  cestas: [
    {section:"DEIXE A CESTA MAIS COMPLETA",limit:"Até 5",items:[
      ["ferrero-extra","Ferrero Rocher extra","17,01"],
      ["nutella-mini","Nutella mini","15,21"],
      ["chocolate-premium","Chocolate premium adicional","13,41"],
      ["caneca-especial","Caneca especial","22,41"],
      ["mini-buque","Mini buquê decorativo","26,91"]
    ]},
    {section:"ACABAMENTO E SURPRESA",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["embalagem-luxo","Embalagem luxo","11,61"]
    ]}
  ],
  chocolate: [
    {section:"CHOCOLATES ADICIONAIS",limit:"Até 6",items:[
      ["ferrero-8","Ferrero Rocher 8 unidades","22,41"],
      ["lindt-extra","Chocolate Lindt adicional","20,61"],
      ["trufa-artesanal","Trufa artesanal especial","8,91"],
      ["barra-premium","Barra de chocolate premium","11,61"],
      ["nutella-mini","Nutella mini","15,21"],
      ["mix-bombons","Mix de bombons selecionados","17,01"]
    ]},
    {section:"TOQUE FINAL",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["embalagem-luxo","Embalagem luxo","11,61"]
    ]}
  ],
  flores: [
    {section:"AUMENTAR O BUQUÊ",limit:"Escolha extras",items:[
      ["mais-3-flores","Adicionar +3 flores ao buquê","17,91"],
      ["mais-6-flores","Adicionar +6 flores ao buquê","31,41"],
      ["mais-12-flores","Transformar em buquê grande +12 flores","53,91"],
      ["folhagem-premium","Folhagem premium e acabamento maior","13,41"],
      ["papel-luxo","Papel floral luxo + laço especial","11,61"]
    ]},
    {section:"COMPLEMENTOS PARA FLORES",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["ferrero-extra","Ferrero Rocher extra","17,01"]
    ]}
  ],
  pelucia: [
    {section:"TAMANHO DA PELÚCIA",limit:"Escolha uma opção",items:[
      ["urso-up-maior","Trocar para o próximo tamanho maior","17,91"],
      ["urso-up-grande","Trocar para urso grande premium","31,41"],
      ["urso-up-gigante","Trocar para urso gigante luxo","53,91"]
    ]},
    {section:"COMPLEMENTOS PARA PELÚCIA",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["ferrero-extra","Ferrero Rocher extra","17,01"]
    ]}
  ],
  portaRetrato: []
};
function getProductType(p){
 const n=String((p&&p.name)||'').toLowerCase();
 const c=String((p&&p.cat)||'').toLowerCase();
 if(p&&p.needPhoto) return 'portaRetrato';
 if(n.includes('urso')||n.includes('ursinho')||n.includes('pelúcia')||n.includes('pelucia')) return 'pelucia';
 if(n.includes('rosa')||n.includes('buquê')||n.includes('buque')||n.includes('girass')||n.includes('flor')) return 'flores';
 if(n.includes('chocolate')||n.includes('ferrero')||n.includes('lindt')||n.includes('godiva')||n.includes('nutella')) return 'chocolate';
 if(n.includes('café')||n.includes('cafe')||c.includes('café')||c.includes('cafe')) return 'cafe';
 if(n.includes('românt')||n.includes('romant')||n.includes('love')||n.includes('te amo')||n.includes('amor')) return 'cestas';
 if(n.includes('cesta')||n.includes('queijo')) return 'cestas';
 return 'default';
}

function getPeluciaGroups(product){
 const n=String((product&&product.name)||'').toLowerCase();
 if(n.includes('1 metro')){
   return [{section:"COMPLEMENTOS PARA PELÚCIA",limit:"Até 3",items:[["cartao-mao","Cartão escrito à mão","4,41"],["balao-coracao","Balão coração","13,41"],["ferrero-extra","Ferrero Rocher extra","17,01"]]}];
 }
 if(n.includes('17 cm')||n.includes('17cm')){
   return [{section:"TAMANHO DA PELÚCIA",limit:"Escolha uma opção",items:[["pelucia-32cm","Trocar para tamanho 32 cm","27,00"]]}, {section:"COMPLEMENTOS PARA PELÚCIA",limit:"Até 3",items:[["cartao-mao","Cartão escrito à mão","4,41"],["balao-coracao","Balão coração","13,41"],["ferrero-extra","Ferrero Rocher extra","17,01"]]}];
 }
 if(n.includes('50cm') || n.includes('grande')){
   return [
    {section:"TAMANHO DA PELÚCIA",limit:"Maior que o atual",items:[
      ["urso-up-70","Trocar para urso gigante 70cm","35,91"],
      ["urso-up-90","Trocar para urso gigante 90cm luxo","62,91"]
    ]},
    {section:"COMPLEMENTOS PARA PELÚCIA",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["ferrero-extra","Ferrero Rocher extra","17,01"]
    ]}
   ];
 }
 if(n.includes('30cm') || n.includes('médio') || n.includes('medio')){
   return [
    {section:"TAMANHO DA PELÚCIA",limit:"Maior que o atual",items:[
      ["urso-up-40","Trocar para urso 40cm","17,91"],
      ["urso-up-50","Trocar para urso 50cm","31,41"],
      ["urso-up-70","Trocar para urso gigante 70cm","53,91"]
    ]},
    {section:"COMPLEMENTOS PARA PELÚCIA",limit:"Até 3",items:[
      ["cartao-mao","Cartão escrito à mão","4,41"],
      ["balao-coracao","Balão coração","13,41"],
      ["ferrero-extra","Ferrero Rocher extra","17,01"]
    ]}
   ];
 }
 return ADDON_GROUPS_BY_TYPE.pelucia;
}

function getAddonGroups(product){
 const type=getProductType(product);
 if(type==='pelucia') return getPeluciaGroups(product);
 return ADDON_GROUPS_BY_TYPE[type] || ADDON_GROUPS_BY_TYPE.default;
}
let modalProduct=null, modalQty=1, modalAddons=[], modalWeight=null; let modalHistoryOpen=false;
function fmtBR(v){return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}).replace(/\u00a0/g,' ')}
function priceNum(v){return Number(String(v).replace(',','.'))||0}
function cartKey(slug, addons){return slug+'|'+(addons||[]).map(a=>a.id).sort().join(',')}
function addCart(slug,name,price,img,addons){addons=addons||[];let key=cartKey(slug,addons);let it=cart.find(x=>(x.key||x.slug)===key);if(it)it.qtd++;else cart.push({key,slug,name,price,img,qtd:1,addons});save();openCart()}
function addCartQty(slug,name,price,img,qtd,addons){addons=addons||[];let key=cartKey(slug,addons);let it=cart.find(x=>(x.key||x.slug)===key);if(it)it.qtd+=qtd;else cart.push({key,slug,name,price,img,qtd,addons});save();openCart()}
function addonTotal(){return modalAddons.reduce((s,a)=>s+priceNum(a.price),0)}
function modalBasePrice(){return modalWeight?priceNum(modalWeight.price):priceNum(modalProduct.price)}
function modalTotal(){return (modalBasePrice()+addonTotal())*modalQty}
function selectModalWeight(label,price,priceOld){
 modalWeight={label,price,priceOld:priceOld||''};
 document.querySelectorAll('input[name=modalWeight]').forEach(x=>x.checked=x.value===label);
 const m=document.querySelector('.productModal');
 if(m){
   m.querySelector('.modalOld').textContent=priceOld?('De R$ '+priceOld):'';
   m.querySelector('.modalPrice').textContent='Por R$ '+price;
 }
 updateModalTotal();
}
function renderModalOptions(){
 const box=document.querySelector('.modalOptions'); if(!box||!modalProduct)return;
 const brands=(modalProduct.brands||[]).map(x=>`<div class="spec"><small>Marca / referência</small><b>${x}</b></div>`).join('');
 const photoBox = modalProduct.needPhoto ? `<div class="photoUploadBox" id="photoUploadBox">
   <h4>ENVIAR FOTO PARA PERSONALIZAR</h4>
   <p>Envie a foto que será usada no porta retrato. Após selecionar, o campo fica verde como confirmado.</p>
   <label class="photoUploadLabel"><input type="file" accept="image/*" onchange="handleCustomPhoto(this)"><span class="photoUploadText">📷 Escolher foto do celular</span></label>
   <div class="photoSelected" id="photoSelected">Foto selecionada ✓</div>
 </div>` : '';
 const weightBox=(modalProduct.weightOptions&&modalProduct.weightOptions.length)?`<div class="addonGroup weightGroup"><div class="addonHead"><h4>ESCOLHA O PESO</h4><span>Selecione uma opção</span></div>${modalProduct.weightOptions.map((w,i)=>`<label class="addonItem"><span><b>${w[0]}</b><small><s>De R$ ${w[2]||w[1]}</s> · Por R$ ${w[1]}</small></span><input type="radio" name="modalWeight" value="${w[0]}" ${i===0?'checked':''} onchange="selectModalWeight('${w[0]}','${w[1]}','${w[2]||w[1]}')"></label>`).join('')}</div>`:'';
 box.innerHTML = weightBox+`<div class="included"><h4>O QUE JÁ VEM NO PRESENTE</h4>${modalProduct.items.map(x=>`<div class="includedItem">✓ ${x}</div>`).join('')}</div>
 ${photoBox}
 <div class="productSpecs"><div class="specGrid">
   <div class="spec"><small>Produto</small><b>${modalProduct.name}</b></div>
   <div class="spec"><small>Acabamento</small><b>Embalagem premium para presente</b></div>
   <div class="spec"><small>Mensagem</small><b>Cartão personalizado incluso</b></div>
   <div class="spec"><small>Observação</small><b>${modalProduct.details||'Composição baseada na foto do produto.'}</b></div>
   ${brands}
 </div></div>` + (getAddonGroups(modalProduct).length ? getAddonGroups(modalProduct).map(g=>`<div class="addonGroup"><div class="addonHead"><h4>${g.section}</h4><span>${g.limit}</span></div>${g.items.map(a=>`<label class="addonItem"><span><b>${a[1]}</b><small>+ R$ ${a[2]}</small></span><input type="checkbox" onchange="toggleAddon('${a[0]}','${a[1]}','${a[2]}',this.checked)"></label>`).join('')}</div>`).join('') : '<div class="noAddonsBox">Produto personalizado sem adicionais obrigatórios. Envie a foto e finalize o pedido.</div>');
}

function handleCustomPhoto(input){
 const box=document.getElementById('photoUploadBox');
 const selected=document.getElementById('photoSelected');
 const file=input&&input.files&&input.files[0];
 if(file){
   window.selectedCustomPhotoName=file.name;
   if(box) box.classList.add('selected');
   if(selected){selected.style.display='block';selected.textContent='Foto selecionada ✓ '+file.name;}
 }else{
   window.selectedCustomPhotoName='';
   if(box) box.classList.remove('selected');
   if(selected) selected.style.display='none';
 }
}
function openProductModal(slug){
 modalProduct=PRODUCTS_DATA.find(p=>p.slug===slug); if(!modalProduct) return;
 modalQty=1; modalAddons=[]; modalWeight=(modalProduct.weightOptions&&modalProduct.weightOptions.length)?{label:modalProduct.weightOptions[0][0],price:modalProduct.weightOptions[0][1],priceOld:modalProduct.weightOptions[0][2]||''}:null; window.selectedCustomPhotoName='';
 let m=document.querySelector('.productModal');
 if(!m){document.body.insertAdjacentHTML('beforeend',`<div class="productModal"><div class="modalBackdrop" onclick="closeProductModal()"></div><div class="modalBox"><button class="modalBackBtn" onclick="closeProductModal()">← Voltar</button><div class="modalTop"><img class="modalImg" src=""><div><h2 class="modalName"></h2><div class="modalPriceRow"><span class="modalOld"></span> <span class="modalPrice"></span></div><p class="modalCat"></p></div></div><div class="modalOptions"></div><div class="modalBottom"><div class="qty"><button onclick="changeModalQty(-1)">−</button><b class="modalQty">1</b><button onclick="changeModalQty(1)">+</button></div><div class="modalTotalBox"><small>Total</small><b class="modalTotal">R$ 0,00</b></div><button class="modalAdd" onclick="confirmModalAdd()">Adicionar</button></div></div></div>`); m=document.querySelector('.productModal');}
 m.querySelector('.modalImg').src=modalProduct.img; m.querySelector('.modalName').textContent=modalProduct.name;
 const salePrice=modalWeight?modalWeight.price:modalProduct.price;
 const fullPrice=modalWeight?(modalWeight.priceOld||modalProduct.priceOld):modalProduct.priceOld;
 m.querySelector('.modalOld').textContent=fullPrice?('De R$ '+fullPrice):'';
 m.querySelector('.modalPrice').textContent='Por R$ '+salePrice;
 m.querySelector('.modalCat').textContent=modalProduct.cat;
 renderModalOptions(); updateModalTotal(); 
 m.classList.add('show'); document.body.classList.add('modalOpen');
 if(!modalHistoryOpen){
   try{ history.pushState({productModal:true}, '', location.href); modalHistoryOpen=true; }catch(e){}
 }
}
function closeProductModal(skipHistory){
 const modal=document.querySelector('.productModal');
 if(modal) modal.classList.remove('show');
 document.body.classList.remove('modalOpen');
 if(modalHistoryOpen && !skipHistory){
   modalHistoryOpen=false;
   try{ history.back(); }catch(e){}
 }else{
   modalHistoryOpen=false;
 }
}
window.addEventListener('popstate',function(e){
 const modal=document.querySelector('.productModal');
 if(modal && modal.classList.contains('show')){
   modal.classList.remove('show');
   document.body.classList.remove('modalOpen');
   modalHistoryOpen=false;
 }
});
function toggleAddon(id,name,price,checked){ if(checked){ if(!modalAddons.find(a=>a.id===id)) modalAddons.push({id,name,price}); } else { modalAddons=modalAddons.filter(a=>a.id!==id);} updateModalTotal(); }
function changeModalQty(n){modalQty=Math.max(1,modalQty+n);updateModalTotal()}
function updateModalTotal(){const m=document.querySelector('.productModal'); if(!m||!modalProduct)return; m.querySelector('.modalQty').textContent=modalQty; m.querySelector('.modalTotal').textContent=fmtBR(modalTotal()); m.querySelector('.modalAdd').innerHTML='Adicionar · '+fmtBR(modalTotal());}
function confirmModalAdd(){ if(!modalProduct)return; 
 const extraAddons=[...modalAddons];
 if(modalWeight) extraAddons.unshift({id:'peso-'+modalWeight.label.replace(/\s+/g,'-').toLowerCase(),name:'Peso: '+modalWeight.label,price:'0,00'});
 if(modalProduct.needPhoto){
   if(window.selectedCustomPhotoName){ extraAddons.push({id:'foto-personalizada',name:'Foto selecionada: '+window.selectedCustomPhotoName,price:'0,00'}); }
   else { extraAddons.push({id:'foto-pendente',name:'Foto será enviada após o pedido',price:'0,00'}); }
 }
 addCartQty(modalProduct.slug,modalProduct.name,String((modalBasePrice()+addonTotal()).toFixed(2)).replace('.',','),modalProduct.img,modalQty,extraAddons); closeProductModal(); }
// renderCart com adicionais
renderCart=function(){
 const el=document.querySelector('.cartItems');const count=document.querySelector('.cartCount');const total=document.querySelectorAll('.cartTotal');if(!el)return;
 if(!cart.length){el.innerHTML='<div class="cartEmpty">Seu carrinho está vazio.<br><small>Escolha uma cesta para continuar.</small></div>'}
 else{
   el.innerHTML=cart.map((i,idx)=>`<div class="cartItem">
     <img src="${i.img}" alt="${i.name}">
     <div>
       <b>${i.name}</b><br>
       <small>Quantidade: ${i.qtd}</small>
       <div class="cartQtyBtns"><button onclick="cart[${idx}].qtd=Math.max(1,cart[${idx}].qtd-1);save()">−</button><span>${i.qtd}</span><button onclick="cart[${idx}].qtd++;save()">+</button></div>
       ${i.addons&&i.addons.length?`<div class="cartAdds">${i.addons.map(a=>'＋ '+a.name).join('<br>')}</div>`:''}
       <div class="cartLinePrice">${(money(i.price)*i.qtd).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</div>
     </div>
     <button class="cartRemove" onclick="cart.splice(${idx},1);save()">×</button>
   </div>`).join('');
 }
  let t=cart.reduce((s,i)=>s+money(i.price)*i.qtd,0);
  const totalQtd=cart.reduce((s,i)=>s+i.qtd,0);
  count&&(count.textContent=totalQtd);
  total.forEach(x=>x.textContent=t.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}));
  const floatCart=document.querySelector('.floatingCart');
  if(floatCart){
    if(totalQtd>0){floatCart.classList.add('pulseCart')}
    else{floatCart.classList.remove('pulseCart')}
  }
};
document.addEventListener('DOMContentLoaded',()=>{renderCart();document.querySelectorAll('[data-open-product]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();openProductModal(b.dataset.openProduct)}));});


// Cidade por IP para mensagem de raio de entrega
(function(){
  function setCity(city){
    if(!city) return;
    document.querySelectorAll('.cityName').forEach(el=>el.textContent=city);
    try{localStorage.setItem('visitor_city',city)}catch(e){}
  }
  try{
    const saved=localStorage.getItem('visitor_city'); if(saved) setCity(saved);
  }catch(e){}
  fetch('https://ipapi.co/json/').then(r=>r.json()).then(d=>setCity(d.city)).catch(()=>{});
})();



