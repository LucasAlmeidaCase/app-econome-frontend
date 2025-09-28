---
applyTo: '**'
---
"Sempre que eu solicitar a revisão de código React em arquivos de um Pull Request, siga rigorosamente as orientações abaixo. A análise deve ser criteriosa, questionadora e objetiva, considerando boas práticas de performance, clareza e manutenção.

1. Padrões de Código e Nomenclatura

Confirme se nomes de componentes, hooks, variáveis e funções seguem convenções adequadas:

Componentes: PascalCase

Hooks: prefixados com use (ex: useAuth)

Variáveis/funções: camelCase

Verifique se nomes são claros e evitam abreviações obscuras.

2. Organização de Pastas e Arquivos

Avalie se a estrutura está organizada por domínios ou features em vez de pastas técnicas genéricas.

Garanta separação entre:

components/ (UI reutilizável)

pages/ ou views/ (screens/rotas)

hooks/

services/ (chamadas de API)

context/ ou store/ (estado global)

Questione duplicações ou componentes muito grandes.

3. Arquitetura e Princípios

Confirme que componentes seguem Single Responsibility.

Avalie se a lógica de negócio não está acoplada à camada de UI (deve estar em hooks/services).

Cheque uso adequado de props e prop drilling (sugira Context ou Zustand/Recoil/Redux se necessário).

4. Boas Práticas React

Prefira function components com hooks em vez de class components.

Verifique uso de:

useMemo / useCallback para evitar renders desnecessários.

React.memo em componentes pesados.

Suspense e lazy loading para divisão de código.

Confirme que key em listas é estável e não usa índices do array sem necessidade.

5. Integração com API

Avalie se chamadas de API estão isoladas em services ou custom hooks (useFetchX, useApi).

Confira tratamento de loading, erro e sucesso.

Questione lógica de transformação de dados no componente — deve estar em serviços/helpers.

6. Tratamento de Erros

Verifique se há Error Boundaries ou handling de erros consistente.

Prefira mensagens claras e semânticas, sem apenas console.log.

7. Qualidade e Manutenção

Componentes e hooks curtos, legíveis e reutilizáveis.

Testes com Jest + React Testing Library cobrindo lógica e renderização.

Comentários apenas quando necessário (regras complexas ou decisões arquiteturais).

8. Decisões de Design

Questione dependências externas não justificadas.

Avalie impacto de design decisions (estado global vs local, escolha de lib de estado, libs de UI).

Sugira melhorias incrementais para performance, acessibilidade e escalabilidade.

Instrução de entrega

Ao revisar o(s) arquivo(s) deste PR, apresente:

Pontos positivos — boas práticas aplicadas.

Sugestões de melhoria/refatoração — ajustes incrementais e boas práticas.

Dúvidas ou observações sobre design — questionamentos que devem ser esclarecidos antes da aprovação.

Seja direto, profissional e criterioso, priorizando clareza, experiência do usuário, performance e manutenibilidade."