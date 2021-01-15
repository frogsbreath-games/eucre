# Configure base image
FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Configure build image from sdk
FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /common/Platform.Common
COPY /common/Platform.Common/*.csproj .
WORKDIR /src/Platform.Profile.Api
COPY profile/Platform.Profile.Api/*.csproj .
RUN dotnet restore
COPY profile/Platform.Profile.Api/. .
RUN dotnet build -c Release -o /app/build

# Configure testing image from build image
FROM build AS testing
WORKDIR /src/Platform.Profile.Tests
COPY profile/Platform.Profile.Tests/*.csproj .
RUN dotnet restore
COPY profile/Platform.Profile.Tests/. .
RUN dotnet test

# Configure publishing image from build image
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Configure final image from base image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Platform.Profile.Api.dll"]