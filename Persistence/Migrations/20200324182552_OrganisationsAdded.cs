using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class OrganisationsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Personal");

            migrationBuilder.CreateTable(
                name: "Organisations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organisations", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Organisations");

            migrationBuilder.CreateTable(
                name: "Personal",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    arb_status = table.Column<string>(type: "TEXT", nullable: true),
                    brukerkonto = table.Column<string>(type: "TEXT", nullable: true),
                    epost = table.Column<string>(type: "TEXT", nullable: true),
                    etternavn = table.Column<string>(type: "TEXT", nullable: true),
                    fodselsdato = table.Column<DateTime>(type: "TEXT", nullable: false),
                    fornavn = table.Column<string>(type: "TEXT", nullable: true),
                    gateadresse = table.Column<string>(type: "TEXT", nullable: true),
                    kjonn = table.Column<string>(type: "TEXT", nullable: true),
                    opprettet = table.Column<DateTime>(type: "TEXT", nullable: false),
                    postnummerid = table.Column<string>(type: "TEXT", nullable: true),
                    telefon = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personal", x => x.Id);
                });
        }
    }
}
