'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

interface TabsTriggerProps {
  value: string
  children: ReactNode
  className?: string
}

interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <div className={className}>
      {Array.isArray(children) ? (
        <>
          {children.map((child) =>
            child?.type?.name === 'TabsList'
              ? ({ ...child, props: { ...child.props, activeTab, setActiveTab } } as any)
              : child
          )}
          {children.map((child) =>
            child?.type?.name === 'TabsContent'
              ? ({ ...child, props: { ...child.props, activeTab } } as any)
              : null
          )}
        </>
      ) : (
        children
      )}
    </div>
  )
}

export function TabsList({ children, className, activeTab, setActiveTab }: any) {
  return (
    <div className={cn('flex gap-0', className)}>
      {Array.isArray(children) &&
        children.map((child) =>
          child
            ? ({ ...child, props: { ...child.props, activeTab, setActiveTab } } as any)
            : null
        )}
    </div>
  )
}

export function TabsTrigger({ value, children, className, activeTab, setActiveTab }: any) {
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        'border-b-2 px-4 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
          : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className, activeTab }: any) {
  if (activeTab !== value) return null

  return <div className={className}>{children}</div>
}
