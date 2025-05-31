"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

// Chart configuration type
export interface ChartConfig {
    [key: string]: {
        label?: React.ReactNode
        icon?: React.ComponentType
        color?: string
        theme?: Record<string, string>
    }
}

// Chart context
type ChartContextProps = {
    config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
    const context = React.useContext(ChartContext)

    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />")
    }

    return context
}

const ChartContainer = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & {
        config: ChartConfig
        children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
    }
>(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                ref={ref}
                className={`flex aspect-video justify-center text-xs ${className || ""}`}
                {...props}
            >
                <style
                    dangerouslySetInnerHTML={{
                        __html: Object.entries(config)
                            .map(
                                ([key, value]) => `
                  [data-chart="${chartId}"] .recharts-layer.recharts-${key} .recharts-rectangle {
                    fill: ${value.color || `hsl(var(--chart-${key}))`};
                  }
                  [data-chart="${chartId}"] .recharts-layer.recharts-${key} .recharts-curve {
                    stroke: ${value.color || `hsl(var(--chart-${key}))`};
                  }
                `,
                            )
                            .join("\n"),
                    }}
                />
                <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    )
})
ChartContainer.displayName = "Chart"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
        hideLabel?: boolean
        hideIndicator?: boolean
        indicator?: "line" | "dot" | "dashed"
        nameKey?: string
        labelKey?: string
    }
>(
    (
        {
            active,
            payload,
            className,
            indicator = "dot",
            hideLabel = false,
            hideIndicator = false,
            label,
            labelFormatter,
            labelClassName,
            formatter,
            color,
            nameKey,
            labelKey,
        },
        ref,
    ) => {
        const { config } = useChart()

        const tooltipLabel = React.useMemo(() => {
            if (hideLabel || !payload?.length) {
                return null
            }

            const [item] = payload
            const key = `${labelKey || item.dataKey || item.name || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const value =
                !labelKey && typeof label === "string"
                    ? config[label as keyof typeof config]?.label || label
                    : itemConfig?.label

            if (labelFormatter && typeof value !== "undefined") {
                return labelFormatter(value, payload)
            }

            return value
        }, [label, labelFormatter, payload, hideLabel, labelKey, config])

        if (!active || !payload?.length) {
            return null
        }

        const nestLabel = payload.length === 1 && indicator !== "dot"

        return (
            <div
                ref={ref}
                className={`grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs shadow-xl ${className || ""}`}
            >
                {!nestLabel ? <div className={`font-medium ${labelClassName || ""}`}>{tooltipLabel}</div> : null}
                <div className="grid gap-1.5">
                    {payload.map((item, index) => {
                        const key = `${nameKey || item.name || item.dataKey || "value"}`
                        const itemConfig = getPayloadConfigFromPayload(config, item, key)
                        const indicatorColor = color || item.payload?.fill || item.color

                        return (
                            <div
                                key={item.dataKey}
                                className={`flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-gray-500`}
                            >
                                {formatter && item?.value !== undefined && item.name ? (
                                    formatter(item.value, item.name, item, index, item.payload)
                                ) : (
                                    <>
                                        {itemConfig?.icon ? (
                                            <itemConfig.icon />
                                        ) : (
                                            !hideIndicator && (
                                                <div
                                                    className={`shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] ${indicator === "dot" ? "h-2.5 w-2.5" : "w-1"
                                                        }`}
                                                    style={
                                                        {
                                                            "--color-bg": indicatorColor,
                                                            "--color-border": indicatorColor,
                                                        } as React.CSSProperties
                                                    }
                                                />
                                            )
                                        )}
                                        <div
                                            className={`flex flex-1 justify-between leading-none ${nestLabel ? "items-end" : "items-center"}`}
                                        >
                                            <div className="grid gap-1.5">
                                                {nestLabel ? <div className={`font-medium ${labelClassName || ""}`}>{tooltipLabel}</div> : null}
                                                <div className="font-medium text-gray-500">{itemConfig?.label || item.name}</div>
                                            </div>
                                            {item.value && (
                                                <div className="font-mono font-medium tabular-nums text-gray-900">
                                                    {item.value.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
        hideIcon?: boolean
        nameKey?: string
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart()

    if (!payload?.length) {
        return null
    }

    return (
        <div
            ref={ref}
            className={`flex items-center justify-center gap-4 ${verticalAlign === "top" ? "pb-3" : "pt-3"
                } ${className || ""}`}
        >
            {payload.map((item) => {
                const key = `${nameKey || item.dataKey || "value"}`
                const itemConfig = getPayloadConfigFromPayload(config, item, key)

                return (
                    <div key={item.value} className={`flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-gray-500`}>
                        {itemConfig?.icon && !hideIcon ? (
                            <itemConfig.icon />
                        ) : (
                            <div
                                className="h-2 w-2 shrink-0 rounded-[2px]"
                                style={{
                                    backgroundColor: item.color,
                                }}
                            />
                        )}
                        {itemConfig?.label}
                    </div>
                )
            })}
        </div>
    )
})
ChartLegendContent.displayName = "ChartLegendContent"

// Utility function to get payload config
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
    if (typeof payload !== "object" || payload === null) {
        return undefined
    }

    const payloadPayload =
        "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
            ? payload.payload
            : undefined

    const configLabelKey: string = key

    if (key in config || (payloadPayload && configLabelKey in payloadPayload)) {
        return config[configLabelKey]
    }

    return config[key]
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, useChart }
