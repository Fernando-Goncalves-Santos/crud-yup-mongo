# Usar imagem oficial do SQL Server 2022
FROM mcr.microsoft.com/mssql/server:2022-latest

# Variáveis de ambiente obrigatórias
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=SuaSenha123!

# Expor a porta padrão
EXPOSE 1433
