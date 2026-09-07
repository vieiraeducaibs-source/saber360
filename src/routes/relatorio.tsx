import { createFileRoute, Link } from '@tanstack/react-router'
import { Printer, CheckCircle2, XCircle, FileText, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/relatorio')({
  component: RelatorioAluno,
})

// Mock da estrutura de dados para o relatório completo
const MOCK_REPORT = {
  studentName: "Maria de Fátima Oliveira",
  enrollment: "MAT-2024-0091",
  course: "Ensino Médio - 2º Ano",
  dateGenerated: new Date().toLocaleDateString('pt-BR'),
  overallScore: "88%",
  exams: [
    {
      id: "ex-1",
      title: "Avaliação Bimestral de Matemática",
      date: "15/03/2024",
      score: "8.5",
      maxScore: "10.0",
      questions: [
        {
          id: "q1",
          text: "1. Qual é a raiz quadrada de 144?",
          options: ["A) 10", "B) 12", "C) 14", "D) 16"],
          userAnswer: "B) 12",
          correctAnswer: "B) 12"
        },
        {
          id: "q2",
          text: "2. Se x + 5 = 12, qual o valor de x?",
          options: ["A) 5", "B) 6", "C) 7", "D) 8"],
          userAnswer: "B) 6",
          correctAnswer: "C) 7"
        },
        {
          id: "q3",
          text: "3. Qual a área de um quadrado de lado 5cm?",
          options: ["A) 20cm²", "B) 25cm²", "C) 30cm²", "D) 10cm²"],
          userAnswer: "B) 25cm²",
          correctAnswer: "B) 25cm²"
        }
      ]
    },
    {
      id: "ex-2",
      title: "Simulado Geral - Linguagens",
      date: "10/04/2024",
      score: "9.0",
      maxScore: "10.0",
      questions: [
        {
          id: "q4",
          text: "1. Indique a alternativa em que há erro de concordância verbal:",
          options: [
            "A) Fazem dez anos que cheguei aqui.",
            "B) Faz dez anos que cheguei aqui.",
            "C) Houve muitos problemas na reunião.",
            "D) Haviam chegado todos os convidados."
          ],
          userAnswer: "A) Fazem dez anos que cheguei aqui.",
          correctAnswer: "A) Fazem dez anos que cheguei aqui."
        },
        {
          id: "q5",
          text: "2. Qual a figura de linguagem presente em: 'Chorou rios de lágrimas'?",
          options: ["A) Metáfora", "B) Hipérbole", "C) Antítese", "D) Eufemismo"],
          userAnswer: "A) Metáfora",
          correctAnswer: "B) Hipérbole"
        }
      ]
    }
  ]
};

function RelatorioAluno() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen py-10 print:py-0 print:bg-white bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Ações / Cabeçalho da Página (Oculto na impressão) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 print:hidden bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200/60">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link 
              to="/" 
              className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-colors"
              title="Voltar à Página Inicial"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="p-3.5 bg-blue-600/10 rounded-2xl hidden sm:block">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Relatório Acadêmico</h1>
              <p className="text-sm text-slate-500 font-medium">Visualização e exportação do boletim</p>
            </div>
          </div>
          <button 
            onClick={handlePrint}
            className="mt-4 sm:mt-0 w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-md hover:shadow-xl active:scale-95"
          >
            <Printer className="w-5 h-5" />
            Exportar / Imprimir
          </button>
        </div>

        {/* Início Relatório Oficial para Impressão */}
        <div className="bg-white print:shadow-none shadow-xl shadow-slate-200/40 rounded-3xl print:rounded-none overflow-hidden border border-slate-100 print:border-none">
          {/* Cabeçalho do Relatório */}
          <div className="p-10 border-b border-slate-100 print:bg-transparent print:px-0 relative overflow-hidden">
            {/* Elemento decorativo sutil (visível apenas na tela) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -mr-20 -mt-20 print:hidden"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <p className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2">
                  Boletim Analítico de Provas
                </p>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  Histórico do Aluno
                </h1>
              </div>
              <div className="text-left md:text-right text-sm">
                <span className="inline-flex items-center text-slate-500 font-medium bg-slate-50 print:bg-transparent px-4 py-2 print:px-0 print:py-0 rounded-full border border-slate-200 print:border-none">
                  Emitido em: <span className="text-slate-800 font-bold ml-2">{MOCK_REPORT.dateGenerated}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
              <div className="bg-slate-50/70 print:bg-transparent p-5 rounded-2xl border border-slate-100 print:border-none print:p-0">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Nome do Aluno</p>
                <p className="text-base font-bold text-slate-800 leading-tight">{MOCK_REPORT.studentName}</p>
              </div>
              <div className="bg-slate-50/70 print:bg-transparent p-5 rounded-2xl border border-slate-100 print:border-none print:p-0">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Matrícula</p>
                <p className="text-base font-bold text-slate-800">{MOCK_REPORT.enrollment}</p>
              </div>
              <div className="bg-slate-50/70 print:bg-transparent p-5 rounded-2xl border border-slate-100 print:border-none print:p-0">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Turma / Curso</p>
                <p className="text-base font-bold text-slate-800 leading-tight">{MOCK_REPORT.course}</p>
              </div>
              <div className="bg-blue-50/50 print:bg-transparent p-5 rounded-2xl border border-blue-100 print:border-none print:p-0">
                <p className="text-xs text-blue-500 uppercase font-bold tracking-wider mb-1 print:text-slate-500">Rendimento Global</p>
                <p className="text-2xl font-black text-blue-700 print:text-slate-800 mt-1">{MOCK_REPORT.overallScore}</p>
              </div>
            </div>
          </div>

          {/* Lista de Provas */}
          <div className="p-6 md:p-10 print:p-0 print:mt-8 bg-slate-50/30 print:bg-white">
            {MOCK_REPORT.exams.map((exam, index) => (
              <div 
                key={exam.id} 
                className={`break-inside-avoid print:break-inside-avoid mb-10 bg-white rounded-3xl border border-slate-100 print:border-slate-300 shadow-sm overflow-hidden ${index > 0 ? 'print:break-before-page' : ''}`}
              >
                {/* Cabeçalho da Prova */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border-b border-slate-100 print:border-slate-300 p-6 sm:p-8 gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{exam.title}</h2>
                    <p className="text-slate-400 print:text-slate-500 text-sm mt-1.5 font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 print:bg-slate-400"></span>
                      Realizada em {exam.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 print:bg-transparent px-5 py-3 rounded-2xl border border-slate-100 print:border-none print:px-0 print:py-0 w-full sm:w-auto">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Nota Final</p>
                    <p className="text-2xl font-black text-slate-800">
                      {exam.score} <span className="text-base font-bold text-slate-300 print:text-slate-400">/ {exam.maxScore}</span>
                    </p>
                  </div>
                </div>

                {/* Questões da Prova */}
                <div className="p-6 sm:p-8 space-y-10 bg-slate-50/10 print:bg-white">
                  {exam.questions.map((q) => {
                    const isQuestionCorrect = q.userAnswer === q.correctAnswer;

                    return (
                      <div key={q.id} className="break-inside-avoid relative">
                        <div className="flex items-start gap-4 mb-5">
                          <div className={`mt-0.5 p-1 rounded-full shrink-0 ${isQuestionCorrect ? 'bg-green-100 print:bg-transparent' : 'bg-red-100 print:bg-transparent'}`}>
                            {isQuestionCorrect ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600 print:text-green-700" strokeWidth={2.5} />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-500 print:text-red-700" strokeWidth={2.5} />
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 leading-relaxed">
                            {q.text}
                          </h3>
                        </div>
                        
                        <div className="grid gap-3 ml-12">
                          {q.options.map((option, optIdx) => {
                            const isUserChoice = option === q.userAnswer;
                            const isCorrect = option === q.correctAnswer;
                            
                            let baseClasses = "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border-2 transition-all font-medium text-sm gap-2 ";
                            
                            if (isUserChoice && isCorrect) {
                              baseClasses += "bg-green-50/50 border-green-500 text-green-900 print:border-green-600 print:bg-green-50";
                            } else if (isUserChoice && !isCorrect) {
                              baseClasses += "bg-red-50/50 border-red-300 text-red-900 print:border-red-400 print:bg-red-50";
                            } else if (!isUserChoice && isCorrect) {
                              baseClasses += "bg-emerald-50/20 border-emerald-400 border-dashed text-emerald-800 print:border-emerald-500 print:bg-transparent";
                            } else {
                              baseClasses += "bg-white border-slate-100 text-slate-600 hover:border-slate-200 print:border-slate-200";
                            }

                            return (
                              <div key={optIdx} className={baseClasses}>
                                <span className={isUserChoice && !isCorrect ? "line-through decoration-red-400 decoration-2 opacity-80" : ""}>
                                  {option}
                                </span>
                                
                                <div className="flex gap-2 self-start sm:self-auto">
                                  {isUserChoice && !isCorrect && (
                                    <span className="bg-red-100 text-red-700 print:bg-white print:border print:border-red-300 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                      Sua resposta
                                    </span>
                                  )}
                                  {isCorrect && (
                                    <span className="bg-green-100 text-green-700 print:bg-white print:border print:border-green-300 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                      Correta
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Rodapé da Impressão */}
          <div className="hidden print:block text-center text-sm text-slate-500 mt-8 mb-4 pt-6 border-t border-slate-200 opacity-80">
            <p className="font-medium">Este documento é um boletim oficial gerado eletronicamente em {MOCK_REPORT.dateGenerated}.</p>
            <p>Plataforma de Gestão Educacional — Conferência Detalhada de Provas</p>
          </div>

        </div>
      </div>
    </div>
  )
}
