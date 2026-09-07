import { createFileRoute } from '@tanstack/react-router'
import { Printer, CheckCircle2, XCircle, FileText } from 'lucide-react'

export const Route = createFileRoute('/')({
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
    <div className="w-full min-h-screen py-8 print:py-0 print:bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Ações / Cabeçalho da Página (Oculto na impressão) */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 print:hidden bg-slate-900 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-800 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Relatório de Desempenho</h1>
              <p className="text-slate-400">Visualize ou exporte o gabarito completo</p>
            </div>
          </div>
          <button 
            onClick={handlePrint}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Printer className="w-5 h-5" />
            Exportar PDF / Imprimir
          </button>
        </div>

        {/* Início Relatório Oficial para Impressão */}
        <div className="bg-white print:shadow-none shadow-sm rounded-xl print:rounded-none overflow-hidden border border-slate-200 print:border-none">
          {/* Cabeçalho do Relatório */}
          <div className="p-8 border-b border-slate-200 bg-slate-50 print:bg-transparent print:px-0">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  Histórico Acadêmico
                </h1>
                <p className="text-slate-500 mt-1 uppercase text-sm tracking-wider font-semibold">
                  Boletim Analítico de Provas
                </p>
              </div>
              <div className="text-right text-sm text-slate-500">
                <p>Emitido em:</p>
                <p className="font-semibold text-slate-800">{MOCK_REPORT.dateGenerated}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-white print:bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
              <div>
                <p className="text-sm text-slate-500">Nome do Aluno</p>
                <p className="text-lg font-bold text-slate-900">{MOCK_REPORT.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Matrícula</p>
                <p className="text-lg font-semibold text-slate-700">{MOCK_REPORT.enrollment}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Turma / Curso</p>
                <p className="text-lg font-semibold text-slate-700">{MOCK_REPORT.course}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Rendimento Global</p>
                <p className="text-lg font-bold text-blue-600">{MOCK_REPORT.overallScore}</p>
              </div>
            </div>
          </div>

          {/* Lista de Provas */}
          <div className="p-8 print:p-0 print:mt-6">
            {MOCK_REPORT.exams.map((exam, index) => (
              <div 
                key={exam.id} 
                className={`break-inside-avoid print:break-inside-avoid mb-12 ${index > 0 ? 'print:break-before-page' : ''}`}
              >
                {/* Cabeçalho da Prova */}
                <div className="flex justify-between items-center bg-slate-800 text-white p-4 rounded-t-lg print:bg-slate-100 print:text-slate-900 print:border print:border-slate-300">
                  <div>
                    <h2 className="text-xl font-bold">{exam.title}</h2>
                    <p className="text-slate-300 print:text-slate-600 text-sm mt-1">Aplicada em: {exam.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-300 print:text-slate-600">Nota Final</p>
                    <p className="text-2xl font-bold">
                      {exam.score} <span className="text-base font-normal text-slate-400 print:text-slate-500">/ {exam.maxScore}</span>
                    </p>
                  </div>
                </div>

                {/* Questões da Prova */}
                <div className="border-x border-b border-slate-200 rounded-b-lg print:border-slate-300 p-6 space-y-8">
                  {exam.questions.map((q) => {
                    const isQuestionCorrect = q.userAnswer === q.correctAnswer;

                    return (
                      <div key={q.id} className="break-inside-avoid">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="mt-1">
                            {isQuestionCorrect ? (
                              <CheckCircle2 className="w-6 h-6 text-green-500 print:text-green-600" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-500 print:text-red-600" />
                            )}
                          </div>
                          <h3 className="text-lg font-medium text-slate-900 leading-snug">
                            {q.text}
                          </h3>
                        </div>
                        
                        <div className="grid gap-2 ml-9">
                          {q.options.map((option, optIdx) => {
                            const isUserChoice = option === q.userAnswer;
                            const isCorrect = option === q.correctAnswer;
                            
                            // Lógica de estilização das alternativas
                            let baseClasses = "p-3 rounded-md border text-sm font-medium transition-colors ";
                            
                            if (isUserChoice && isCorrect) {
                              baseClasses += "bg-green-100 border-green-400 text-green-900 print:bg-green-50 print:border-green-500";
                            } else if (isUserChoice && !isCorrect) {
                              baseClasses += "bg-red-100 border-red-300 text-red-900 line-through decoration-red-400 print:bg-white print:border-red-400";
                            } else if (!isUserChoice && isCorrect) {
                              baseClasses += "bg-emerald-50 border-emerald-200 text-emerald-800 print:bg-white print:border-emerald-400";
                            } else {
                              baseClasses += "bg-white border-slate-200 text-slate-600";
                            }

                            return (
                              <div key={optIdx} className={`flex items-center justify-between ${baseClasses}`}>
                                <span>{option}</span>
                                {
                                  isUserChoice && !isCorrect && <span className="text-xs font-bold text-red-600 uppercase tracking-wider ml-4">Resposta do Aluno</span>
                                }
                                {
                                  isCorrect && <span className="text-xs font-bold text-green-700 uppercase tracking-wider ml-4">Gabarito Correto</span>
                                }
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
          <div className="hidden print:block text-center text-sm text-slate-500 mt-12 pt-4 border-t border-slate-200">
            <p>Este é um documento oficial emitido em {MOCK_REPORT.dateGenerated}.</p>
            <p>Sistema de Gestão Educacional - Relatório de Conferência de Provas</p>
          </div>

        </div>
      </div>
    </div>
  )
}
