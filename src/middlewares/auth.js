// Importa a bibliotecajsonwebtoken para lidar com a criação e validação de tokens JWT
const jwt = require("jsonwebtoken");

// Exporta um middleware do Express que vai intercetar as requisições nas rotas protegidas
module.exports = (req, res, next) => {
  // Pega o cabeçalho de autorização enviado na requisição HTTP (ex: "Bearer eyJhbGciOi...")
  const authHeader = req.headers.authorization;

  // 1. Verifica se o cabeçalho de autorização foi enviado
  if (!authHeader) {
    return res.status(401).json({ erro: "Token de autenticação não fornecido" });
  }

  // 2. Divide o cabeçalho em duas partes: a palavra "Bearer" e o token em si
  const parts = authHeader.split(" ");

  // Verifica se o cabeçalho realmente contém duas partes
  if (parts.length !== 2) {
    return res.status(401).json({ erro: "Erro no formato do token" });
  }

  // Separa as partes nas respetivas variáveis (scheme deve ser "Bearer", e token é a string encriptada)
  const [scheme, token] = parts;

  // 3. Valida se a palavra "Bearer" está escrita corretamente (ignorando maiúsculas/minúsculas)
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ erro: "Token malformatado" });
  }

  // 4. Valida a autenticidade e a validade do token utilizando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET || "mente_em_jogo_secret_key_2026", (err, decoded) => {
    // Se o token for inválido, adulterado ou estiver expirado, retorna erro 401 (Não autorizado)
    if (err) {
      return res.status(401).json({ erro: "Token inválido ou expirado" });
    }

    // Se estiver tudo correto, guarda o ID do usuário decodificado dentro do objeto `req`
    // Isso permite que as rotas seguintes saibam exatamente qual usuário está a realizar a ação
    req.usuarioId = decoded.id;
    
    // Libera o acesso para a próxima função da rota (o controler do desafio)
    return next();
  });
};