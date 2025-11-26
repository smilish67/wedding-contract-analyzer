import { FileEdit, Shield, CheckCircle } from 'lucide-react'

export default function HomeSection({ onNavigate }) {
  return (
    <section className="section">
      <div className="hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center py-20">
            <div className="hero-content max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                AI 기반 웨딩 계약 분석 서비스
              </div>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
                안전한 결혼 준비,<br />
                <span className="text-primary">웨딩가드</span>와 함께
              </h1>
              <p className="hero-subtitle text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                복잡한 계약서 분석부터 불공정 조항 탐지까지.<br />
                AI가 당신의 소중한 결혼 준비를 든든하게 지켜드립니다.
              </p>
              <div className="hero-buttons flex flex-wrap gap-4">
                <button
                  className="btn btn-primary h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all"
                  onClick={() => onNavigate('analyze')}
                >
                  <FileEdit className="w-5 h-5 mr-2" /> 무료로 계약서 분석하기
                </button>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>표준 계약서 기반 위험 탐지</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>24시간 실시간 분석</span>
                </div>
              </div>
            </div>

            <div className="hero-image relative hidden lg:block h-[600px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" />

              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-80 bg-card backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl p-6 z-30 transform transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">계약 안전도</div>
                      <div className="text-xs text-muted-foreground">AI 분석 완료</div>
                    </div>
                  </div>
                  <div className="badge badge-default px-3 py-1">안전</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium">위약금 조항</span>
                    </div>
                    <span className="text-xs text-success font-bold">적합</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">종합 점수</div>
                  <div className="text-xl font-bold text-primary">98점</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 border-y border-border py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">왜 웨딩가드인가요?</h2>
            <p className="text-muted-foreground">데이터로 증명하는 웨딩 시장의 불균형, 이제 기술로 해결합니다</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: '69%', title: '전년 대비 상담 증가율', subtitle: '(대구시 \'23년 기준)' },
              { number: '60%+', title: '계약해제·위약금 분쟁', subtitle: '전체 상담 중' },
              { number: '67.7%', title: '추가 옵션 강요 사례', subtitle: '소비자 피해 유형' },
              { number: '49.4%', title: '가격 정보 미제공', subtitle: '정보 비대칭 문제' }
            ].map((stat, index) => (
              <div key={index} className="relative p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all text-center group">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/50 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-bold text-foreground mb-2">{stat.title}</div>
                <div className="text-sm text-muted-foreground">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
