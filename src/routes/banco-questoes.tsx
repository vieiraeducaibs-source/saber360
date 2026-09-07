import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { ArrowLeft, Search, ChevronLeft, ChevronRight, Database, Filter, CheckCircle2, ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/banco-questoes')({
  component: BancoQuestoes,
})

const SUBJECTS = ['Matemática', 'Linguagens', 'Ciências da Natureza', 'Ciências Humanas']
const DIFFICULTIES = ['Fácil', 'Média', 'Difícil']

// Gerador dinâmico de 100 questões por disciplina (Total: 400)
const generateMockQuestions = () => {
  const q = []
  let idCounter = 1
  
  SUBJECTS.forEach(subject => {
    for (let i = 1; i <= 100; i++) {
      // Distribuição artificial de dificuldade
      const rand = Math.random();
      const difficulty = rand > 0.7 ? 'Difícil' : rand > 0.4 ? 'Média' : 'Fácil';
      
      let text = '';
      let options = [];
      let answer = '';

      const numA = Math.floor(Math.random() * 50) + i;
      const numB = Math.floor(Math.random() * 50) + 1;

      if (subject === 'Matemática') {
        text = `Considere a operação estrutural para resolução do problema. Qual é o resultado correto da expressão envolvendo a soma de ${numA} e ${numB}?`;
        answer = `A) ${numA + numB}`;
        options = [answer, `B) ${numA + numB + 2}`, `C) ${numA + numB - 3}`, `D) ${numA + numB + 10}`];
      } else if (subject === 'Linguagens') {
        const temas = ['concordância verbal', 'regência nominal', 'colocação pronominal', 'interpretação de texto'];
        const tema = temas[i % temas.length];
        text = `No contexto acadêmico e na norma padrão da língua portuguesa, assinale a alternativa que apresenta a regra correta sobre ${tema}.`;
        answer = `A) Justificativa correta e alinhada à norma padrão.`;
        options = [answer, `B) Variação aceita apenas em contextos informais.`, `C) Erro conceitual frequente no uso coloquial.`, `D) Exceção literária sem aplicação geral.`];
      } else if (subject === 'Ciências da Natureza') {
        text = `Em relação aos processos sistêmicos observados na biosfera, analise a interação descrita na amostra ${i} e identifique a consequência direta do fenômeno.`;
        answer = `A) Aceleração do ciclo metabólico local.`;
        options = [answer, `B) Redução drástica da evapotranspiração.`, `C) Interrupção momentânea da cadeia alimentar.`, `D) Inversão da polaridade magnética residual.`];
      } else {
        text = `Durante o período histórico estudado no módulo ${idCounter % 5 + 1}, qual dos fatores abaixo foi determinante para o desfecho das tensões geopolíticas instauradas?`;
        answer = `A) Assinatura de tratados comerciais bilaterais.`;
        options = [answer, `B) Escassez imprevista de matérias-primas essenciais.`, `C) Intervenção militar de nações vizinhas.`, `D) Quebra do sistema financeiro central.`];
      }

      q.push({
        id: `q-${idCounter++}`,
        subject,
        difficulty,
        text,
        options: options,
        answer,
        code: `${subject.substring(0,3).toUpperCase()}${(i).toString().padStart(3, '0')}`
      })
    }
  })
  return q
}

// Gerado apenas uma vez fora do render
const ALL_QUESTIONS = generateMockQuestions()

function BancoQuestoes() {
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const ITEMS_PER_PAGE = 15

  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      const matchSearch = q.text.toLowerCase().includes(search.toLowerCase()) || q.code.toLowerCase().includes(search.toLowerCase())
      const matchSubject = subjectFilter ? q.subject === subjectFilter : true
      return matchSearch && matchSubject
    })
  }, [search, subjectFilter])

  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)
  const paginatedQuestions = filteredQuestions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // Reseta a página ao filtrar
  const handleFilterChange = (subject: string | null) => {
    setSubjectFilter(subject)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              to="/"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Banco de Questões</h1>
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Acervo total: {ALL_QUESTIONS.length} questões cadastradas
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filtros */}
        <aside className="md:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex gap-2 items-center text-slate-800 font-bold mb-4">
              <Search className="w-4 h-4" />
              Buscar
            </div>
            <input
              type="text"
              placeholder="Palavra-chave ou código..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex gap-2 items-center text-slate-800 font-bold mb-4">
              <Filter className="w-4 h-4" />
              Disciplinas
            </div>
            <div className="space-y-2">
              <button
                onClick={() => handleFilterChange(null)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  subjectFilter === null ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Todas as disciplinas
              </button>
              {SUBJECTS.map(subject => (
                <button
                  key={subject}
                  onClick={() => handleFilterChange(subject)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    subjectFilter === subject ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Lista de Questões */}
        <div className="md:col-span-3 flex flex-col gap-4">
           <div className="flex justify-between items-center mb-2 px-2">
            <p className="text-slate-500 font-medium text-sm">
              Mostrando <span className="text-slate-800 font-bold">{filteredQuestions.length}</span> resultados
            </p>
          </div>

          {paginatedQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all overflow-hidden">
              <div 
                className="p-6 cursor-pointer flex flex-col gap-4"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md tracking-wider">
                      {q.code}
                    </span>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">
                      {q.subject}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                      q.difficulty === 'Fácil' ? 'bg-emerald-50 text-emerald-600' : 
                      q.difficulty === 'Média' ? 'bg-amber-50 text-amber-600' : 
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedId === q.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                <h3 className="text-slate-800 font-medium leading-relaxed pr-8">
                  {q.text}
                </h3>
              </div>

              {/* Detalhes / Alternativas expandidas */}
              {expandedId === q.id && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-100 grid gap-3 animate-fade-in">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 ml-1">Alternativas:</div>
                  {q.options.map((option, idx) => {
                    const isCorrect = option === q.answer;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-4 rounded-xl border ${isCorrect ? 'border-green-200 bg-green-50/50' : 'border-slate-200 bg-white'}`}
                      >
                        <span className={`text-sm font-medium ${isCorrect ? 'text-green-900' : 'text-slate-600'}`}>
                          {option}
                        </span>
                        {isCorrect && (
                          <div className="flex items-center gap-1.5 text-green-700 bg-green-100 px-2 py-1 rounded-md text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Gabarito
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
              <Database className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Nenhuma questão encontrada para os filtros atuais.</p>
            </div>
          )}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>
              <span className="text-sm font-medium text-slate-500">
                Página {page} de {totalPages}
              </span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl disabled:opacity-50 hover:bg-slate-50 transition-colors"
              >
                Próxima <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
