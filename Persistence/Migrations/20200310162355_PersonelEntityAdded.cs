using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PersonelEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Personal",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    fornavn = table.Column<string>(nullable: true),
                    etternavn = table.Column<string>(nullable: true),
                    brukerkonto = table.Column<string>(nullable: true),
                    kjonn = table.Column<string>(nullable: true),
                    epost = table.Column<string>(nullable: true),
                    telefon = table.Column<string>(nullable: true),
                    arb_status = table.Column<string>(nullable: true),
                    opprettet = table.Column<DateTime>(nullable: false),
                    fodselsdato = table.Column<DateTime>(nullable: false),
                    gateadresse = table.Column<string>(nullable: true),
                    postnummerid = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personal", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Personal");
        }
    }
}
