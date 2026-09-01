'use client';

import { useMemo, useState } from 'react';

const leads = [
  { name: 'Pousada Mar Azul', city: 'Cabo Frio', niche: 'Hospedagem', rating: 4.8, reviews: 187, score: 96, status: 'Demonstrou interesse', owner: 'Thaís', phone: '(22) 99941-7820', image: '/demo-pousada.jpg' },
  { name: 'Studio Aurora Beauty', city: 'Niterói', niche: 'Beleza', rating: 4.7, reviews: 94, score: 91, status: 'Aguardando retorno', owner: 'Lucas', phone: '(21) 99826-4513', image: '/demo-beleza.jpg' },
  { name: 'Sabor da Serra Bistrô', city: 'Petrópolis', niche: 'Restaurante', rating: 4.9, reviews: 263, score: 98, status: 'Proposta', owner: 'Vitor', phone: '(24) 99218-6074', image: '/demo-restaurante.jpg' },
  { name: 'Clínica Horizonte', city: 'São José dos Campos', niche: 'Saúde', rating: 4.6, reviews: 121, score: 88, status: 'Novo', owner: 'Thaís', phone: '(12) 99773-2190', image: '/demo-clinica.jpg' },
];
const nav = ['Visão geral', 'Pesquisar', 'Oportunidades', 'Ligações', 'Histórico diário'];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState('Visão geral');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<(typeof leads)[number] | null>(null);
  const visible = useMemo(() => leads.filter((lead) => `${lead.name} ${lead.city} ${lead.niche}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <main className={dark ? 'app dark' : 'app light'}>
      <aside className="sidebar">
        <img className="brand" src={dark ? '/eltriim-logo-oficial.png' : '/eltriim-logo-claro.png'} alt="ELTRIIM Digital" />
        <div className="demo-pill">AMBIENTE DEMONSTRATIVO</div><p className="tagline">Seu negócio mais perto de quem procura.</p>
        <nav>{nav.map((item, index) => <button key={item} className={active === item ? 'active' : ''} onClick={() => setActive(item)}><span>{['⌂','⌕','◎','☎','◷'][index]}</span>{item}</button>)}</nav>
        <div className="safe-note"><strong>DADOS FICTÍCIOS</strong><span>Nenhuma informação desta página pertence a clientes reais.</span></div>
      </aside>
      <section className="workspace">
        <header><div><small>SISTEMA DE PROSPECÇÃO</small><h1>{active}</h1></div><div className="header-actions"><button className="theme" onClick={() => setDark(!dark)} aria-label="Alternar tema">{dark ? '☀' : '☾'}</button><div className="profile"><b>DE</b><span><strong>Demo ELTRIIM</strong><small>Perfil público</small></span></div></div></header>
        <div className="content">
          <div className="notice"><b>DEMONSTRAÇÃO PÚBLICA</b><span>Explore o fluxo da Central ELTRIIM com empresas, atividades e resultados fictícios.</span></div>
          <section className="hero"><div><small>BOA TARDE, VISITANTE</small><h2>Transforme pesquisas em <em>oportunidades.</em></h2><p>Uma visão organizada da prospecção, dos contatos e da produção comercial.</p></div><button onClick={() => setActive('Pesquisar')}>Nova pesquisa</button></section>
          <div className="metrics">{[['Oportunidades','24','cadastradas'],['Ligações hoje','11','registradas'],['Contatos','16','iniciados'],['Propostas','5','em andamento']].map(([label,value,help]) => <article key={label}><small>{label}</small><strong>{value}</strong><span>{help}</span></article>)}</div>
          <section className="panel">
            <div className="panel-title"><div><small>BANCO DE OPORTUNIDADES</small><h3>Empresas analisadas</h3></div><label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar empresa, cidade ou nicho" /></label></div>
            <div className="cards">{visible.map((lead) => <article className="lead-card" key={lead.name} onClick={() => setSelected(lead)}><img src={lead.image} alt="Imagem ilustrativa" /><div><span className="score">{lead.score} pontos</span><h4>{lead.name}</h4><p>{lead.niche} · {lead.city}</p><div className="rating">★ {lead.rating} <small>{lead.reviews} avaliações</small></div><footer><span>{lead.status}</span><button>Analisar</button></footer></div></article>)}</div>
          </section>
          <footer style={{display:'flex',justifyContent:'center',gap:5,padding:'28px 12px 0',color:'var(--muted)',fontSize:10}}><span>Projeto idealizado e criado por</span><strong style={{color:'var(--cyan)'}}>Thaís Moreira</strong><span>para a ELTRIIM Digital.</span></footer>
        </div>
      </section>
      {selected && <div className="overlay" onClick={() => setSelected(null)}><section className="modal" onClick={(event) => event.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><img src={selected.image} alt="Imagem ilustrativa da empresa" /><small>OPORTUNIDADE FICTÍCIA</small><h2>{selected.name}</h2><p>{selected.niche} em {selected.city} · ★ {selected.rating} com {selected.reviews} avaliações</p><div className="modal-grid"><div><b>Potencial</b><span>{selected.score} pontos</span></div><div><b>Responsável</b><span>{selected.owner}</span></div><div><b>Telefone fictício</b><span>{selected.phone}</span></div><div><b>Status</b><span>{selected.status}</span></div></div><div className="analysis"><b>Análise demonstrativa</b><p>A empresa tem ótima reputação local e pode transformar avaliações positivas em mais contatos com uma página rápida, profissional e integrada ao WhatsApp.</p></div><button className="primary">Gerar leadpage demonstrativa</button></section></div>}
    </main>
  );
}

