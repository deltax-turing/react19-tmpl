export default function FontComp() {
  return (
    <div>
      <p className="bg-red-200">대부분의 텍스트는 Pretendard를 사용합니다.</p>

      <h1 className="font-display text-4xl font-bold">Display Title (Inter)</h1>

      <code className="font-mono bg-gray-100 px-2 py-1">const code = "JetBrains Mono";</code>

      <blockquote className="font-serif italic">正式引用文本使用 Serif 字体</blockquote>

      <span className="font-handwriting text-2xl">손글씨 느낌</span>
    </div>
  )
}
