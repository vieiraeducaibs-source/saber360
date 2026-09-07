import { createFileRoute, Link } from '@tanstack/react-router'
import { FileText, BarChart3, Users, BookOpen, GraduationCap, ArrowRight, MousePointerClick } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Inicio,
})

function Inicio() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar Minimalista */}
      <nav className="w-full border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold tracking-tight">EduPlatform</span>
          </div>
          <div className="flex gap-4">
            <Link to="/relatorio" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              Área do Aluno
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full pt-20 pb-16 px-6 relative overflow-hidden">
        {/* Fundo dinâmico decorativo */}
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
            Nova plataforma disponível
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Gestão inteligente para <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              instituições de excelência
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Acompanhe o desempenho, exporte relatórios detalhados e transforme a análise acadêmica com uma interface simples, moderna e focada no essencial.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/relatorio" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 active:scale-95 w-full sm:w-auto justify-center"
            >
              <FileText className="w-5 h-5" />
              Visualizar Relatório Interativo
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#recursos"
              className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full font-bold transition-all w-full sm:w-auto justify-center"
            >
              <MousePointerClick className="w-5 h-5" />
              Conhecer os Recursos
            </a>
          </div>
        </div>
      </section>

      {/* Vitrine Explicativa de Recursos */}
      <section id="recursos" className="w-full py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Gere análises profundas sobre as turmas e ofereça um portal completo para o acompanhamento dos alunos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Link 
              to="/banco-questoes"
              className="block bg-[#FCFAF6] p-8 rounded-2xl border border-[#EAE6DF] hover:shadow-xl hover:shadow-[#EAE6DF]/50 hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-up cursor-pointer group"
              style={{ animationDelay: '150ms' }}
            >
              <div className="flex items-center justify-between mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                <h3 className="text-lg font-bold tracking-tight">Banco de questões</h3>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Acesse o acervo dinâmico com mais de 400 questões cadastradas. Filtre por disciplina, explore e visualize os gabaritos.
              </p>
            </Link>

            {/* Card 2 */}
            <div 
              className="bg-[#FCFAF6] p-8 rounded-2xl border border-[#EAE6DF] hover:shadow-xl hover:shadow-[#EAE6DF]/50 hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-up cursor-default"
              style={{ animationDelay: '350ms' }}
            >
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Provas com QR Code</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Monte provas a partir do banco, gere versões diferentes, folha de respostas e um código único por aluno para correção.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="bg-[#FCFAF6] p-8 rounded-2xl border border-[#EAE6DF] hover:shadow-xl hover:shadow-[#EAE6DF]/50 hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-up cursor-default"
              style={{ animationDelay: '550ms' }}
            >
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Correção e relatórios</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Correção automática das objetivas, correção manual das discursivas e relatórios por turma, aluno, questão e habilidade.
              </p>
            </div>
          </div>
          
          {/* Botão extra no fim das vitrines */}
          <div className="mt-16 flex justify-center">
            <Link 
              to="/relatorio" 
              className="inline-flex items-center gap-3 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
            >
              Experimente acessar um relatório agora
              <span className="p-2 bg-blue-100 rounded-full group-hover:pr-1 group-hover:pl-3 transition-all">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
