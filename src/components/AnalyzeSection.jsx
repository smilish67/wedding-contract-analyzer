import { useState, useRef } from 'react'
import { FileText, CloudUpload, Info, Upload, Loader2, CheckCircle } from 'lucide-react'
import { contractRisks, exampleContract } from '../data/contractRisks'
import Modal from './Modal'
import Toast from './Toast'

export default function AnalyzeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [analyzedContract, setAnalyzedContract] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // 파일 크기 체크 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB를 초과할 수 없습니다.')
      setToast({ message: '파일 크기는 10MB를 초과할 수 없습니다.', type: 'error' })
      return
    }

    // 파일 형식 체크
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setError('JPG, PNG, PDF 형식만 지원됩니다.')
      setToast({ message: 'JPG, PNG, PDF 형식만 지원됩니다.', type: 'error' })
      return
    }

    setToast({ message: '계약서를 분석하고 있습니다...', type: 'info' })
    await uploadAndAnalyze(file)
  }

  const uploadAndAnalyze = async (file) => {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('https://n8n.dpgtestbed.kr/webhook-test/analyzeContract', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`)
      }

      // 응답 텍스트 먼저 확인
      const responseText = await response.text()

      if (!responseText) {
        throw new Error('서버에서 빈 응답을 반환했습니다.')
      }

      // JSON 파싱 시도
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('JSON 파싱 오류:', parseError)
        console.error('응답 내용:', responseText)
        throw new Error('서버 응답을 처리할 수 없습니다. 응답 형식을 확인해주세요.')
      }

      // n8n 응답 JSON 구조 파싱
      // data에는 contract_summary, clause_analysis, checklist_evaluation 포함
      setAnalyzedContract(data)
      setIsModalOpen(true)
      setToast({ message: '계약서 분석이 완료되었습니다!', type: 'success' })
    } catch (err) {
      console.error('분석 오류:', err)
      setError('계약서 분석 중 오류가 발생했습니다. 다시 시도해주세요.')
      setToast({ message: '계약서 분석 중 오류가 발생했습니다.', type: 'error' })
    } finally {
      setIsLoading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const loadExampleContract = () => {
    // 데모용 예시 계약서
    setAnalyzedContract(exampleContract)
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="section py-20 bg-muted/20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="section-header text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
              AI Contract Analysis
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
              웨딩 계약서 <span className="text-primary">AI 정밀 분석</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              복잡한 웨딩 계약서, 사진 한 장으로 쉽고 빠르게 분석하세요.<br className="hidden sm:block" />
              불공정 약관부터 위약금 조항까지 AI가 꼼꼼하게 점검해드립니다.
            </p>
          </div>

          <div className="mb-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
              {/* Upload Area */}
              <label
                className={`group relative flex flex-col items-center justify-center min-h-[500px] w-full rounded-3xl border-2 border-dashed border-muted-foreground/20 bg-card p-12 text-center transition-all duration-300 ${isLoading ? 'cursor-default opacity-80' : 'cursor-pointer hover:border-primary/50 hover:bg-primary/5'}`}
                onClick={(e) => isLoading && e.preventDefault()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isLoading}
                />

                {isLoading ? (
                  <div className="flex flex-col items-center animate-pulse">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">분석 중입니다</h3>
                    <p className="text-muted-foreground">잠시만 기다려주세요...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                        <CloudUpload className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">계약서 업로드</h3>
                    <p className="text-muted-foreground mb-8 max-w-xs leading-relaxed">
                      계약서 이미지나 PDF 파일을<br />여기로 끌어놓거나 클릭해서 업로드하세요
                    </p>
                    <div className="btn btn-primary h-12 px-8 rounded-full text-base shadow-lg group-hover:shadow-primary/25 transition-all">
                      <Upload className="w-5 h-5 mr-2" /> 파일 선택하기
                    </div>
                    <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> JPG, PNG, PDF</span>
                      <span className="w-px h-3 bg-border"></span>
                      <span>최대 10MB</span>
                    </div>
                  </>
                )}

                {error && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-auto min-w-[300px] p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                    {error}
                  </div>
                )}
              </label>

              {/* Info/Process Area */}
              <div className="space-y-8">
                  <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
                    <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      분석 리포트 예시
                    </h4>

                    {/* Demo Report Preview */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-success" />
                                </div>
                                <span className="font-medium text-sm">환불 규정 적합성</span>
                            </div>
                            <span className="badge badge-outline bg-background">적합</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-xl border border-destructive/20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                                    <Info className="w-4 h-4 text-destructive" />
                                </div>
                                <span className="font-medium text-sm text-destructive">과도한 위약금 조항</span>
                            </div>
                            <span className="badge badge-destructive">위험</span>
                        </div>
                    </div>

                    <button
                        onClick={loadExampleContract}
                        className="w-full py-4 rounded-xl border-2 border-dashed border-primary/20 text-primary font-medium hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                    >
                        <FileText className="w-5 h-5" /> 예시 보고서 체험하기
                    </button>
                  </div>

                  <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
                    <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      분석 프로세스
                    </h4>
                    <div className="relative">
                        <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-muted"></div>
                        <div className="space-y-6 relative">
                            {[
                                { title: '자동 텍스트 추출', desc: 'OCR 기술로 계약서 내용을 인식합니다' },
                                { title: '표준약관 비교', desc: '공정위 표준약관과 조항을 대조합니다' },
                                { title: 'AI 위험도 평가', desc: '불공정 조항 및 독소 조항을 탐지합니다' },
                                { title: '전문가 검토 완료', desc: '변호사 검수를 거친 데이터로 분석합니다' }
                            ].map((step, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="w-7 h-7 rounded-full bg-background border-2 border-primary z-10 flex-shrink-0"></div>
                                    <div>
                                        <h5 className="font-semibold text-foreground text-sm mb-1">{step.title}</h5>
                                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="disclaimer flex items-start gap-4 rounded-2xl bg-muted/50 p-6 text-sm text-muted-foreground max-w-3xl mx-auto">
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-muted-foreground/70" />
            <p className="leading-relaxed">
              웨딩가드의 AI 분석 결과는 법적 효력을 갖지 않으며, 소비자 분쟁 해결을 위한 참고 자료로만 활용하시기 바랍니다.
              정확한 법률 자문이 필요한 경우 전문가와 상담하는 것을 권장합니다.
            </p>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} contract={analyzedContract} />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
