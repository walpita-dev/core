-- disable referential integrity
EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL' 
GO 

EXEC sp_MSForEachTable 'DELETE FROM ?' 
GO 

-- enable referential integrity again 
EXEC sp_MSForEachTable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL' 
GO

DROP INDEX fkIdx_25 ON dbo.Account;
DROP INDEX fkIdx_225 ON dbo.Role;
DROP INDEX fkIdx_233 ON dbo.Role;