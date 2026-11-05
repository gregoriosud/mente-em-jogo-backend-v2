// Importa todos os modelos criados para a aplicação
const Usuario = require("./Usuario");
const DesafioMemoria = require("./DesafioMemoria");
const DesafioRaciocinio = require("./DesafioRaciocinio");
const DesafioTerapeutico = require("./DesafioTerapeutico");
const SessaoExercicio = require("./SessaoExercicio");

// ==========================================
// DEFINIÇÃO DOS RELACIONAMENTOS (ASSOCIATIONS)
// ==========================================

// 1. Relacionamento entre Usuario e DesafioMemoria (Módulo Lúdico)
// Um usuário pode ter vários registros de desafios de memória (1 para N)
Usuario.hasMany(DesafioMemoria, { foreignKey: "usuario_id" });
// Cada desafio de memória pertence a um único usuário (N para 1)
DesafioMemoria.belongsTo(Usuario, { foreignKey: "usuario_id" });

// 2. Relacionamento entre Usuario e DesafioRaciocinio (Módulo Lógico)
// Um usuário pode ter vários registros de desafios de raciocínio
Usuario.hasMany(DesafioRaciocinio, { foreignKey: "usuario_id" });
// Cada desafio de raciocínio pertence a um único usuário
DesafioRaciocinio.belongsTo(Usuario, { foreignKey: "usuario_id" });

// 3. Relacionamento entre Usuario e DesafioTerapeutico (Módulo Terapêutico)
// Um usuário pode ter vários registros de exercícios terapêuticos
Usuario.hasMany(DesafioTerapeutico, { foreignKey: "usuario_id" });
// Cada exercício terapêutico pertence a um único usuário
DesafioTerapeutico.belongsTo(Usuario, { foreignKey: "usuario_id" });

// 4. Relacionamento entre Usuario e SessaoExercicio (Sessões Gerais)
// Um usuário pode registrar várias sessões de exercício
Usuario.hasMany(SessaoExercicio, { foreignKey: "usuario_id" });
// Cada sessão de exercício pertence a um único usuário
SessaoExercicio.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Exporta todos os modelos já associados e prontos para uso no restante da API
module.exports = {
  Usuario,
  DesafioMemoria,
  DesafioRaciocinio,
  DesafioTerapeutico,
  SessaoExercicio,
};