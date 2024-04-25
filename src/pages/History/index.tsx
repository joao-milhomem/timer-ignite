import { useContext } from 'react'
import { HistoryContainer, Status } from './styled'
import { CycleContext } from '../../contexts/CycleContextProvider'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <div className="table-container">
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.title}</td>
                  <td>{cycle.minutes + ' minuto(s)'}</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.endDate && (
                      <Status statusColor="green">Finalizado</Status>
                    )}

                    {cycle.shutDownDate && !cycle.endDate && (
                      <Status statusColor="red">Interrompido</Status>
                    )}

                    {cycle.isActive && (
                      <Status statusColor="yellow">Em andamento</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </HistoryContainer>
  )
}
