import { timeFormat as d3TimeFormat } from "d3-time-format"
import { CommonTypes } from "src/types"

export const renderDate = (date: CommonTypes.Datetime) => d3TimeFormat("%B %d, %Y")(new Date(date))
