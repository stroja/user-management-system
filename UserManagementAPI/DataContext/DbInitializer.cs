using Microsoft.EntityFrameworkCore;
using System;

namespace UserManagementAPI.DataContext
{
    internal class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;

        public DbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            modelBuilder.Entity<User>().HasData(
                   new User() { Id = 1, FirstName = "Tarik", LastName = "Omerovic", EmailAddress = "tomerovic@gmail.com", UserName = "tomerovic", Password = "password123", Status = true },
                  new User() { Id = 2, FirstName = "Hamdo", LastName = "Hamidovic", EmailAddress = "hhamidovic@gmail.com", UserName = "hhamidovic", Password = "password123", Status = true },
                  new User() { Id = 3, FirstName = "Edin", LastName = "Smailovic", EmailAddress = "esmailovic@gmail.com", UserName = "esmailovic", Password = "password123", Status = true },
                  new User() { Id = 4, FirstName = "Emir", LastName = "Rifetbegovic", EmailAddress = "emirrifatbegovic@gmail.com", UserName = "emirrifatbegovic", Password = "password123", Status = true },
                  new User() { Id = 5, FirstName = "Dino", LastName = "Muzaferlic", EmailAddress = "dinoMuzaferlic@gmail.com", UserName = "dinomuzaferlic", Password = "password123", Status = true },
                  new User() { Id = 6, FirstName = "Amar", LastName = "Silajdzic", EmailAddress = "amarsilajdzic@gmail.com", UserName = "asilajdzic", Password = "password123", Status = true },
                  new User() { Id = 7, FirstName = "Kerim", LastName = "Sarajlic", EmailAddress = "kerimsarajlic@gmail.com", UserName = "kerimsarajlic", Password = "password123", Status = true },
                  new User() { Id = 8, FirstName = "Milan", LastName = "Milanovic", EmailAddress = "milanmilanovic@gmail.com", UserName = "mmilanovic", Password = "password123", Status = true }
            );
            modelBuilder.Entity<Permission>().HasData(

                 new Permission() { Id = 1, Code = "green", Description = "Admin" },
                 new Permission() { Id = 2, Code = "blue", Description = "User" },
                 new Permission() { Id = 3, Code = "yellow", Description = "Approver" },
                 new Permission() { Id = 4, Code = "purple", Description = "Financer" },
                 new Permission() { Id = 5, Code = "red", Description = "Team lead" }
                 );
            modelBuilder.Entity<UserPermission>().HasData(
                 new UserPermission() { UserId = 1, PermissionId = 2 },
                 new UserPermission() { UserId = 2, PermissionId = 3 },
                 new UserPermission() { UserId = 3, PermissionId = 1 },
                 new UserPermission() { UserId = 4, PermissionId = 1 },
                 new UserPermission() { UserId = 5, PermissionId = 2 }
                 );
        }
    }
}