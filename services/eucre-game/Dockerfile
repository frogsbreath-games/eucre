# Configure base image
FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Configure build image from sdk
FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src/Games.Eucre.Api
COPY Games.Eucre.Api/*.csproj .
RUN dotnet restore
COPY Games.Eucre.Api/. .
RUN dotnet build -c Release -o /app/build

# Configure testing image from build image
FROM build AS testing
WORKDIR /src/Games.Eucre.Tests
COPY Games.Eucre.Tests/*.csproj .
RUN dotnet restore
COPY Games.Eucre.Tests/. .
RUN dotnet test

# Configure publishing image from build image
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Configure final image from base image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Games.Eucre.Api.dll"]