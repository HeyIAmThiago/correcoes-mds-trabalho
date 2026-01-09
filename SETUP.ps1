# =============================================================================
# WORKOUT DAY GYM - SETUP COMPLETO
# Execute este script após clonar o repositório
# =============================================================================

Write-Host "`n🏋️  WORKOUT DAY GYM - SETUP COMPLETO`n" -ForegroundColor Cyan

# 1. Subir containers
Write-Host "[1/4] Subindo containers Docker..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -ne 0) { Write-Host "❌ Erro ao subir containers!`n" -ForegroundColor Red; exit 1 }
Write-Host "✅ Containers iniciados!`n" -ForegroundColor Green

# 2. Aguardar backend
Write-Host "[2/4] Aguardando backend inicializar (60 segundos)..." -ForegroundColor Yellow
Start-Sleep -Seconds 60
Write-Host "✅ Backend pronto!`n" -ForegroundColor Green

# 3. Criar usuários
Write-Host "[3/4] Criando usuários do sistema..." -ForegroundColor Yellow

# Executive
$exec = @{ username = "executive@gmail.com"; password = "senha_exec_123" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "http://localhost:5000/executive" -Method Post -ContentType "application/json" -Body $exec | Out-Null
} catch { }

# Login Executive
$execLogin = Invoke-RestMethod -Uri "http://localhost:5000/executiveLogin" -Method Post -ContentType "application/json" -Body $exec
$execToken = $execLogin.token

# Branch Manager
$manager = @{ username = "gerente@filial.com"; password = "gerente@filial.com" } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri "http://localhost:5000/branch_manager/register" -Method Post -ContentType "application/json" -Headers @{ "x-executive-token" = $execToken } -Body $manager | Out-Null
} catch { }

# Login Manager
$managerLogin = Invoke-RestMethod -Uri "http://localhost:5000/branch_manager" -Method Post -ContentType "application/json" -Body $manager
$managerToken = $managerLogin.token

Write-Host "✅ Usuários criados!`n" -ForegroundColor Green

# 4. Cadastrar produtos
Write-Host "[4/4] Cadastrando produtos..." -ForegroundColor Yellow

$produtos = @(
    @{ name = "Energy Drink Turbo"; price = 12.90; InStock = 100; isCourse = $false; isMeal = $false; isGoods = $true; image = "/energy-drink.jpeg"; description = "Energetico para treinos intensos" },
    @{ name = "Garrafa Termica Pro"; price = 45.90; InStock = 50; isCourse = $false; isMeal = $false; isGoods = $true; image = "/mug.jpeg"; description = "Mantenha sua bebida gelada por 24h" },
    @{ name = "Mochila Fitness Premium"; price = 89.90; InStock = 20; isCourse = $false; isMeal = $false; isGoods = $true; image = "/gym-logo.jpeg"; description = "Mochila resistente com compartimento para tenis" },
    @{ name = "Whey Protein Premium"; price = 149.90; InStock = 80; isCourse = $false; isMeal = $false; isGoods = $true; image = "/energy-drink.jpeg"; description = "Proteina de alta qualidade para ganho muscular" },
    @{ name = "Marmita Fitness Completa"; price = 25.90; InStock = 30; isCourse = $false; isMeal = $true; isGoods = $false; allergies = @(); calories = 450; image = "/gym-logo.jpeg"; description = "Refeicao balanceada com proteinas e carboidratos" },
    @{ name = "Personal Training"; price = 89.90; InStock = 15; isCourse = $true; isMeal = $false; isGoods = $false; startTime = "08:00"; endTime = "09:00"; courseCoachId = "000000000000000000000000"; image = "/avatar.jpeg"; description = "Treino personalizado com acompanhamento profissional" },
    @{ name = "Aula de Yoga"; price = 69.90; InStock = 12; isCourse = $true; isMeal = $false; isGoods = $false; startTime = "18:00"; endTime = "19:00"; courseCoachId = "000000000000000000000000"; image = "/avatar.jpeg"; description = "Aula de yoga para todos os niveis" },
    @{ name = "Camiseta DryFit Pro"; price = 49.90; InStock = 40; isCourse = $false; isMeal = $false; isGoods = $true; image = "/gym-logo.jpeg"; description = "Camiseta de tecido que nao transpira" }
)

$count = 0
foreach ($produto in $produtos) {
    try {
        Invoke-RestMethod -Uri "http://localhost:5000/product" -Method Post -ContentType "application/json; charset=utf-8" -Headers @{ "x-manager-token" = $managerToken } -Body ($produto | ConvertTo-Json -Depth 10) | Out-Null
        $count++
    } catch { }
}

Write-Host "✅ $count produtos cadastrados!`n" -ForegroundColor Green

# Finalização
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ SETUP COMPLETO!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "🌐 ACESSE: http://localhost:3000`n" -ForegroundColor Yellow

Write-Host "🔑 CREDENCIAIS:`n" -ForegroundColor Yellow
Write-Host "📌 GERENTE:" -ForegroundColor Cyan
Write-Host "   URL:   http://localhost:3000/branch" -ForegroundColor White
Write-Host "   Email: gerente@filial.com" -ForegroundColor White
Write-Host "   Senha: gerente@filial.com`n" -ForegroundColor White

Write-Host "📌 CLIENTE (cadastre-se em /register):" -ForegroundColor Cyan
Write-Host "   URL:   http://localhost:3000/login`n" -ForegroundColor White

Write-Host "💡 Pressione Ctrl + Shift + R no navegador para limpar cache!`n" -ForegroundColor Gray

