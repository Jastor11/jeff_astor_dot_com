import type * as React from "react"
import { cn } from "@/utils/styles"

const StyledTr: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <tr className={cn("flex flex-row", className)}>{children}</tr>
)
const StyledTd: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <td
    className={cn(
      "p-1 py-3",
      // "border border-neutral-300",
      "duration-100",
      "flex flex-1 items-center justify-center",
      // "bg-even-less-dark text-slate-400",
      // "hover:text-light",
      // "border border-slate-800",
      // "text-white",
      "tablet:whitespace-nowrap"
    )}
  >
    {children}
  </td>
)

export function CRUDEndpointsTable({ resource = "listing" }) {
  return (
    <table
      className={cn(
        "crud-endpoints-table",
        "w-full max-w-screen-95% tablet:max-w-3xl elevate-1 mx-auto text-xs mobile:text-sm xs:text-base",
        "bg-even-less-dark text-slate-400",
        "border border-slate-800",
        "elevate-3",
        "",
        //
        ""
      )}
    >
      <thead className="font-bold text-light">
        <StyledTr className="border-b border-slate-800">
          <StyledTd>Endpoint</StyledTd>
          <StyledTd>Method</StyledTd>
          <StyledTd>Description</StyledTd>
        </StyledTr>
      </thead>
      <tbody>
        <StyledTr>
          <StyledTd>{`/${resource}/`}</StyledTd>
          <StyledTd>POST</StyledTd>
          <StyledTd>Create a new {resource}</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledTd>{`/${resource}/{id}/`}</StyledTd>
          <StyledTd>GET</StyledTd>
          <StyledTd>Get a {resource} by id</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledTd>{`/${resource}/`}</StyledTd>
          <StyledTd>GET</StyledTd>
          <StyledTd>Get all available {resource}s</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledTd>{`/${resource}/{id}/`}</StyledTd>
          <StyledTd>PUT</StyledTd>
          <StyledTd>Update a {resource} by id</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledTd>{`/${resource}/{id}/`}</StyledTd>
          <StyledTd>DELETE</StyledTd>
          <StyledTd>Delete a {resource} by id</StyledTd>
        </StyledTr>
      </tbody>
    </table>
  )
}

export default CRUDEndpointsTable
