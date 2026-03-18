import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function ComponentsPage() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">컴포넌트 갤러리</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          shadcn/ui 기반 컴포넌트 모음
        </p>
      </div>

      {/* 버튼 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>버튼 (Button)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="outline">아웃라인 버튼</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">작은 버튼</Button>
            <Button size="md">중간 버튼</Button>
            <Button size="lg">큰 버튼</Button>
          </div>
        </CardContent>
      </Card>

      {/* 배지 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>배지 (Badge)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">기본</Badge>
            <Badge variant="secondary">보조</Badge>
            <Badge variant="success">성공</Badge>
            <Badge variant="warning">경고</Badge>
            <Badge variant="danger">위험</Badge>
          </div>
        </CardContent>
      </Card>

      {/* 입력 필드 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>입력 필드 (Input)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              텍스트 입력
            </label>
            <input
              type="text"
              placeholder="텍스트를 입력하세요"
              className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              이메일 입력
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="mt-1 block w-full rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            />
          </div>
        </CardContent>
      </Card>

      {/* 테이블 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>테이블 (Table)</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="px-4 py-2 text-left text-sm font-semibold">이름</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">상태</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">액션</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: '항목 1', status: '완료' },
                { name: '항목 2', status: '진행 중' },
                { name: '항목 3', status: '대기 중' },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-2 text-sm">{item.name}</td>
                  <td className="px-4 py-2 text-sm">
                    <Badge
                      variant={
                        item.status === '완료'
                          ? 'success'
                          : item.status === '진행 중'
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <Button size="sm" variant="outline">
                      편집
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* 색상 팔레트 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>색상 팔레트</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { name: '파란색', bg: 'bg-blue-600' },
            { name: '초록색', bg: 'bg-green-600' },
            { name: '노란색', bg: 'bg-yellow-600' },
            { name: '빨간색', bg: 'bg-red-600' },
            { name: '자주색', bg: 'bg-purple-600' },
            { name: '핑크색', bg: 'bg-pink-600' },
            { name: '인디고', bg: 'bg-indigo-600' },
            { name: '회색', bg: 'bg-gray-600' },
          ].map((color) => (
            <div key={color.name} className="text-center">
              <div className={`mb-2 h-20 rounded ${color.bg}`} />
              <p className="text-sm text-gray-700 dark:text-gray-300">{color.name}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
