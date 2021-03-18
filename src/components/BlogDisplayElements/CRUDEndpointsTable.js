import React from "react"
import styled from "styled-components"

const StyledTable = styled.table`
  & td {
    padding: 0.2rem;
  }
`
const TableHead = styled.thead`
  font-weight: bold;
`

export default function CRUDEndpointsTable({ resource = "listing" }) {
  return (
    <StyledTable>
      <TableHead>
        <tr>
          <td>Endpoint</td>
          <td>Method</td>
          <td>Description</td>
        </tr>
      </TableHead>
      <tbody>
        <tr>
          <td>{`/${resource}/`}</td>
          <td>POST</td>
          <td>Create a new {resource}</td>
        </tr>
        <tr>
          <td>{`/${resource}/{id}/`}</td>
          <td>GET</td>
          <td>Get a {resource} by id</td>
        </tr>
        <tr>
          <td>{`/${resource}/`}</td>
          <td>GET</td>
          <td>Get all available {resource}s</td>
        </tr>
        <tr>
          <td>{`/${resource}/{id}/`}</td>
          <td>PUT</td>
          <td>Update a {resource} by id</td>
        </tr>
        <tr>
          <td>{`/${resource}/{id}/`}</td>
          <td>DELETE</td>
          <td>Delete a {resource} by id</td>
        </tr>
      </tbody>
    </StyledTable>
  )
}
