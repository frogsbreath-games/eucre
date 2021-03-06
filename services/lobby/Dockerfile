# Configure base image
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Configure build image from sdk
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /common/Platform.Common
COPY /common/Platform.Common/*.csproj .
WORKDIR /src/Platform.Lobby.Api
COPY lobby/Platform.Lobby.Api/*.csproj .
RUN dotnet restore
WORKDIR /common/Platform.Common
COPY common/Platform.Common/. .
WORKDIR /src/Platform.Lobby.Api
COPY lobby/Platform.Lobby.Api/. .
RUN dotnet build -c Release -o /app/build

# Configure testing image from build image
FROM build AS testing
WORKDIR /src/Platform.Lobby.Tests
COPY lobby/Platform.Lobby.Tests/*.csproj .
RUN dotnet restore
COPY lobby/Platform.Lobby.Tests/. .
RUN dotnet test

# Configure publishing image from build image
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Configure final image from base image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Platform.Lobby.Api.dll"]