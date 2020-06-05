
-- ************************************** [dbo].[Person]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Person')
CREATE TABLE [dbo].[Person]
(
 [p_id]                 int IDENTITY NOT NULL ,
 [p_uuid]               uniqueidentifier NOT NULL ,
 [p_firstname]          varchar(50) NOT NULL ,
 [p_lastname]           varchar(50) NOT NULL ,
 [p_birthdate]          datetimeoffset(7) NOT NULL ,
 [p_created_at]         datetimeoffset(7) NOT NULL ,
 [p_last_modified_at]   datetimeoffset(7) NOT NULL ,
 [p_professional_email] varchar(50) UNIQUE NOT NULL ,
 [p_personal_email]     varchar(50) UNIQUE NOT NULL ,


 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED ([p_id] ASC) 
);
GO


-- ************************************** [dbo].[Account]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Account')
CREATE TABLE [dbo].[Account]
(
 [a_id]               int IDENTITY NOT NULL ,
 [a_uuid]             uniqueidentifier NOT NULL ,
 [a_created_at]       datetimeoffset(7) NOT NULL ,
 [a_last_modified_at] datetimeoffset(7) NOT NULL ,
 [a_fk_person_id]   int NOT NULL ,
 [a_password]         varchar(255) NOT NULL ,
 [a_login]            varchar(50) UNIQUE NOT NULL ,
 [a_refresh_token]    uniqueidentifier NOT NULL ,
 [a_refresh_token_limit]  int NOT NULL,

 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED ([a_id] ASC),
 CONSTRAINT [FK_Person_id] FOREIGN KEY ([a_fk_person_id])  REFERENCES [dbo].[Person]([p_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_Person_id] ON [dbo].[Account] 
 (
  [a_fk_person_id] ASC
 )

GO


-- ************************************** [Role_Type]

IF NOT EXISTS (SELECT * FROM sys.tables t WHERE t.name='Role_Type')
CREATE TABLE [Role_Type]
(
 [rt_id]               int IDENTITY NOT NULL ,
 [rt_role]             varchar(50) NOT NULL ,
 [rt_created_at]       datetimeoffset(7) NOT NULL ,
 [rt_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_Role_Type] PRIMARY KEY CLUSTERED ([rt_id] ASC)
);
GO

INSERT INTO Role_Type VALUES
('ADMIN_SKILVIOO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ADMIN_ORGA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ADMIN_TRAINING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('COLLAB_TRAINING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ADMIN_COMPANY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ADMIN_JOB', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('DOCUMENTALIST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('COMMERCIAL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)


-- ************************************** [dbo].[Entity_Type]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Entity_Type')
CREATE TABLE [dbo].[Entity_Type]
(
 [et_id]               int IDENTITY NOT NULL ,
 [et_created_at]       datetimeoffset(7) NOT NULL ,
 [et_last_modified_at] datetimeoffset(7) NOT NULL ,
 [et_type]             varchar(50) UNIQUE NOT NULL ,


 CONSTRAINT [PK_Entity_Type] PRIMARY KEY CLUSTERED ([et_id] ASC)
);
GO

INSERT INTO Entity_Type (et_type, et_created_at, et_last_modified_at) VALUES
('TRAINING_ORGANISATION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('TRAINING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('COMPANY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('APPLICATION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)


-- ************************************** [dbo].[Role]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Role')
CREATE TABLE [dbo].[Role]
(
 [r_account_id]     int NOT NULL ,
 [r_role_type_id]   int NOT NULL ,
 [r_entity_uuid]    uniqueidentifier NOT NULL ,
 [r_entity_type_id] int NOT NULL ,
 [r_created_at]       datetimeoffset(7) NOT NULL ,
 [r_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED ([r_account_id] ASC, [r_role_type_id] ASC, [r_entity_uuid] ASC, [r_entity_type_id] ASC),
 CONSTRAINT [FK_225] FOREIGN KEY ([r_account_id])  REFERENCES [dbo].[Account]([a_id]),
 CONSTRAINT [FK_233] FOREIGN KEY ([r_role_type_id])  REFERENCES [dbo].[Role_Type]([rt_id]),
 CONSTRAINT [FK_252] FOREIGN KEY ([r_entity_type_id])  REFERENCES [dbo].[Entity_Type]([et_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_225] ON [dbo].[Role] 
 (
  [r_account_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_233] ON [dbo].[Role] 
 (
  [r_role_type_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_252] ON [dbo].[Role] 
 (
  [r_entity_type_id] ASC
 )

GO


-- ************************************** [dbo].[Application]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Application')
CREATE TABLE [dbo].[Application]
(
 [app_id]               int IDENTITY NOT NULL ,
 [app_created_at]       datetimeoffset(7) NOT NULL ,
 [app_last_modified_at] datetimeoffset(7) NOT NULL ,
 [app_name]             varchar(50) UNIQUE NOT NULL ,
 [app_uuid]             uniqueidentifier NOT NULL ,


 CONSTRAINT [PK_Application] PRIMARY KEY CLUSTERED ([app_id] ASC)
);
GO

INSERT INTO Application (app_name, app_created_at, app_last_modified_at, app_uuid) VALUES
('SKILVIOO_BACKOFFICE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NEWID())


-- ************************************** [dbo].[Resource_status]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Resource_status')
CREATE TABLE [dbo].[Resource_status]
(
 [rs_id]               int IDENTITY NOT NULL ,
 [rs_status]           varchar(50) NOT NULL ,
 [rs_created_at]       datetimeoffset(7) NOT NULL ,
 [rs_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_Resource_status] PRIMARY KEY CLUSTERED ([rs_id] ASC)
);
GO
INSERT INTO Resource_status (rs_status, rs_created_at, rs_last_modified_at) VALUES
('OFFLINE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ONLINE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('REQUESTED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

-- ************************************** [dbo].[Resource_type]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Resource_type')
CREATE TABLE [dbo].[Resource_type]
(
 [rt_id]               int IDENTITY NOT NULL ,
 [rt_type]             varchar(50) NOT NULL ,
 [rt_created_at]       datetimeoffset(7) NOT NULL ,
 [rt_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_Resource_type] PRIMARY KEY CLUSTERED ([rt_id] ASC)
);
GO

INSERT INTO Resource_type (rt_type, rt_created_at, rt_last_modified_at) VALUES
('KNOWLEDGE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('KNOW_HOW', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SOCIAL_SKILL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SOFT_SKILL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)


-- ************************************** [dbo].[Resource_label_FR]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Resource_label_FR')
CREATE TABLE [dbo].[Resource_label_FR]
(
 [rl_FR_id]   int IDENTITY NOT NULL ,
 [rl_FR_name] varchar(255) NOT NULL ,


 CONSTRAINT [PK_Resource_label_FR] PRIMARY KEY CLUSTERED ([rl_FR_id] ASC)
);
GO


-- ************************************** [dbo].[Resource_label_EN]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Resource_label_EN')
CREATE TABLE [dbo].[Resource_label_EN]
(
 [rl_EN_id]   int IDENTITY NOT NULL ,
 [rl_EN_name] varchar(255) NOT NULL ,


 CONSTRAINT [PK_Resource_label_EN] PRIMARY KEY CLUSTERED ([rl_EN_id] ASC)
);
GO


-- ************************************** [dbo].[Resource]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Resource')
CREATE TABLE [dbo].[Resource]
(
 [r_id]                    int IDENTITY NOT NULL ,
 [r_fk_resource_type_id]   int NOT NULL ,
 [r_fk_resource_status_id] int NOT NULL ,
 [r_created_at]            datetimeoffset(7) NOT NULL ,
 [r_last_modified_at]      datetimeoffset(7) NOT NULL ,
 [r_uuid]                  uniqueidentifier NOT NULL ,
 [r_name_FR]               int NOT NULL ,
 [r_name_EN]               int NULL ,


 CONSTRAINT [PK_Resource] PRIMARY KEY CLUSTERED ([r_id] ASC),
 CONSTRAINT [FK_278] FOREIGN KEY ([r_name_FR])  REFERENCES [dbo].[Resource_label_FR]([rl_FR_id]),
 CONSTRAINT [FK_285] FOREIGN KEY ([r_name_EN])  REFERENCES [dbo].[Resource_label_EN]([rl_EN_id]),
 CONSTRAINT [FK_79] FOREIGN KEY ([r_fk_resource_type_id])  REFERENCES [dbo].[Resource_type]([rt_id]),
 CONSTRAINT [FK_86] FOREIGN KEY ([r_fk_resource_status_id])  REFERENCES [dbo].[Resource_status]([rs_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_278] ON [dbo].[Resource] 
 (
  [r_name_FR] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_285] ON [dbo].[Resource] 
 (
  [r_name_EN] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_79] ON [dbo].[Resource] 
 (
  [r_fk_resource_type_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_86] ON [dbo].[Resource] 
 (
  [r_fk_resource_status_id] ASC
 )

GO

-- ************************************** [dbo].[Evaluation_type]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Evaluation_type')
CREATE TABLE [dbo].[Evaluation_type]
(
 [et_id]               int IDENTITY NOT NULL ,
 [et_type]             varchar(50) NOT NULL ,
 [et_created_at]       datetimeoffset(7) NOT NULL ,
 [et_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_Evaluation_type] PRIMARY KEY CLUSTERED ([et_id] ASC)
);
GO

-- ************************************** [dbo].[Evaluation_history]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Evaluation_history')
CREATE TABLE [dbo].[Evaluation_history]
(
 [eh_id]                    int IDENTITY NOT NULL ,
 [eh_resource_id]           int NOT NULL ,
 [eh_person_id]             int NOT NULL ,
 [eh_created_at]            datetimeoffset(7) NOT NULL ,
 [eh_last_modified_at]      datetimeoffset(7) NOT NULL ,
 [eh_fk_evaluation_type_id] int NOT NULL ,
 [eh_level]                 int NOT NULL ,


 CONSTRAINT [PK_Evaluation_history] PRIMARY KEY CLUSTERED ([eh_id] ASC, [eh_resource_id] ASC, [eh_person_id] ASC),
 CONSTRAINT [FK_210] FOREIGN KEY ([eh_fk_evaluation_type_id])  REFERENCES [dbo].[Evaluation_type]([et_id]),
 CONSTRAINT [FK_213] FOREIGN KEY ([eh_resource_id])  REFERENCES [dbo].[Resource]([r_id]),
 CONSTRAINT [FK_216] FOREIGN KEY ([eh_person_id])  REFERENCES [dbo].[Person]([p_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_210] ON [dbo].[Evaluation_history] 
 (
  [eh_fk_evaluation_type_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_213] ON [dbo].[Evaluation_history] 
 (
  [eh_resource_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_216] ON [dbo].[Evaluation_history] 
 (
  [eh_person_id] ASC
 )

GO

-- ************************************** [dbo].[Activity_label_FR]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Activity_label_FR')
CREATE TABLE [dbo].[Activity_label_FR]
(
 [al_FR_id]   int IDENTITY NOT NULL ,
 [al_FR_name] varchar(255) NOT NULL ,


 CONSTRAINT [PK_Activity_label_FR] PRIMARY KEY CLUSTERED ([al_FR_id] ASC)
);
GO


-- ************************************** [dbo].[Activity_label_EN]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Activity_label_EN')
CREATE TABLE [dbo].[Activity_label_EN]
(
 [al_EN_id]   int IDENTITY NOT NULL ,
 [al_EN_name] varchar(255) NOT NULL ,


 CONSTRAINT [PK_Activity_label_EN] PRIMARY KEY CLUSTERED ([al_EN_id] ASC)
);
GO


-- ************************************** [dbo].[Activity]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Activity')
CREATE TABLE [dbo].[Activity]
(
 [a_id]               int IDENTITY NOT NULL ,
 [a_uuid]             uniqueidentifier NOT NULL ,
 [a_created_at]       datetimeoffset(7) NOT NULL ,
 [a_last_modified_at] datetimeoffset(7) NOT NULL ,
 [a_name_FR]          int NOT NULL ,
 [a_name_EN]          int NULL ,


 CONSTRAINT [PK_Activity] PRIMARY KEY CLUSTERED ([a_id] ASC),
 CONSTRAINT [FK_297] FOREIGN KEY ([a_name_FR])  REFERENCES [dbo].[Activity_label_FR]([al_FR_id]),
 CONSTRAINT [FK_300] FOREIGN KEY ([a_name_EN])  REFERENCES [dbo].[Activity_label_EN]([al_EN_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_297] ON [dbo].[Activity] 
 (
  [a_name_FR] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_300] ON [dbo].[Activity] 
 (
  [a_name_EN] ASC
 )

GO

-- ************************************** [dbo].[Job_label_FR]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Job_label_FR')
CREATE TABLE [dbo].[Job_label_FR]
(
 [jl_FR_id]   int IDENTITY NOT NULL ,
 [jl_FR_name] varchar(255) NOT NULL ,


 CONSTRAINT [PK_Job_label_FR] PRIMARY KEY CLUSTERED ([jl_FR_id] ASC)
);
GO


-- ************************************** [dbo].[Job_label_EN]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Job_label_EN')
CREATE TABLE [dbo].[Job_label_EN]
(
 [jl_EN_id]   int IDENTITY NOT NULL ,
 [jl_EN_name] varchar(255) NOT NULL ,


 CONSTRAINT [PK_Job_label_EN] PRIMARY KEY CLUSTERED ([jl_EN_id] ASC)
);
GO

-- ************************************** [dbo].[Job]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Job')
CREATE TABLE [dbo].[Job]
(
 [j_id]               int IDENTITY NOT NULL ,
 [j_uuid]             uniqueidentifier NOT NULL ,
 [j_rome_code]        varchar(50) NULL ,
 [j_created_at]       datetimeoffset(7) NOT NULL ,
 [j_last_modified_at] datetimeoffset(7) NOT NULL ,
 [j_name_FR]          int NOT NULL ,
 [j_name_EN]          int NULL ,


 CONSTRAINT [PK_Job] PRIMARY KEY CLUSTERED ([j_id] ASC),
 CONSTRAINT [FK_311] FOREIGN KEY ([j_name_FR])  REFERENCES [dbo].[Job_label_FR]([jl_FR_id]),
 CONSTRAINT [FK_314] FOREIGN KEY ([j_name_EN])  REFERENCES [dbo].[Job_label_EN]([jl_EN_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_311] ON [dbo].[Job] 
 (
  [j_name_FR] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_314] ON [dbo].[Job] 
 (
  [j_name_EN] ASC
 )

GO

-- ************************************** [dbo].[JT_Job_Activity]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='JT_Job_Activity')
CREATE TABLE [dbo].[JT_Job_Activity]
(
 [jtja_job_id]          int NOT NULL ,
 [jtja_activity_id]     int NOT NULL ,
 [jtja_created_at]      datetimeoffset(7) NOT NULL ,
 [jtja_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_JT_Job_Activity] PRIMARY KEY CLUSTERED ([jtja_job_id] ASC, [jtja_activity_id] ASC),
 CONSTRAINT [FK_137] FOREIGN KEY ([jtja_job_id])  REFERENCES [dbo].[Job]([j_id]),
 CONSTRAINT [FK_141] FOREIGN KEY ([jtja_activity_id])  REFERENCES [dbo].[Activity]([a_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_137] ON [dbo].[JT_Job_Activity] 
 (
  [jtja_job_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_141] ON [dbo].[JT_Job_Activity] 
 (
  [jtja_activity_id] ASC
 )

GO

-- ************************************** [dbo].[Company]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Company')
CREATE TABLE [dbo].[Company]
(
 [c_id]                                      int IDENTITY NOT NULL ,
 [c_name]                                    varchar(50) NOT NULL ,
 [c_uuid]                                    uniqueidentifier NOT NULL ,
 [c_created_at]                              datetimeoffset(7) NOT NULL ,
 [c_last_modified_at]                        datetimeoffset(7) NOT NULL ,
 [c_node]                                    hierarchyid NOT NULL ,
 [c_organisation_level as c_node.GetLevel()] int NOT NULL ,


 CONSTRAINT [PK_Organisation] PRIMARY KEY CLUSTERED ([c_id] ASC)
);
GO

-- ************************************** [dbo].[Post]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='Post')
CREATE TABLE [dbo].[Post]
(
 [p_id]                       int IDENTITY NOT NULL ,
 [p_name]                     varchar(50) NOT NULL ,
 [p_uuid]                     uniqueidentifier NOT NULL ,
 [p_created_at]               datetimeoffset(7) NOT NULL ,
 [p_last_modified_at]         datetimeoffset(7) NOT NULL ,
 [p_created_by_fk_company_id] int NOT NULL ,


 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED ([p_id] ASC),
 CONSTRAINT [FK_165] FOREIGN KEY ([p_created_by_fk_company_id])  REFERENCES [dbo].[Company]([c_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_165] ON [dbo].[Post] 
 (
  [p_created_by_fk_company_id] ASC
 )

GO

-- ************************************** [dbo].[JT_Post_Job]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='JT_Post_Job')
CREATE TABLE [dbo].[JT_Post_Job]
(
 [jtpj_job_id]           int NOT NULL ,
 [jtpj_post_id]          int NOT NULL ,
 [jtpj_created_at]       datetimeoffset(7) NOT NULL ,
 [jtpj_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_JT_Post_Job] PRIMARY KEY CLUSTERED ([jtpj_job_id] ASC, [jtpj_post_id] ASC),
 CONSTRAINT [FK_183] FOREIGN KEY ([jtpj_job_id])  REFERENCES [dbo].[Job]([j_id]),
 CONSTRAINT [FK_187] FOREIGN KEY ([jtpj_post_id])  REFERENCES [dbo].[Post]([p_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_183] ON [dbo].[JT_Post_Job] 
 (
  [jtpj_job_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_187] ON [dbo].[JT_Post_Job] 
 (
  [jtpj_post_id] ASC
 )

GO

-- ************************************** [dbo].[JT_Activity_Resource]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='JT_Activity_Resource')
CREATE TABLE [dbo].[JT_Activity_Resource]
(
 [jtar_activity_id]      int NOT NULL ,
 [jtar_resource_id]      int NOT NULL ,
 [jtar_created_at]       datetimeoffset(7) NOT NULL ,
 [jtar_last_modified_at] datetimeoffset(7) NOT NULL ,


 CONSTRAINT [PK_JT_Activity_Resource] PRIMARY KEY CLUSTERED ([jtar_activity_id] ASC, [jtar_resource_id] ASC),
 CONSTRAINT [FK_149] FOREIGN KEY ([jtar_activity_id])  REFERENCES [dbo].[Activity]([a_id]),
 CONSTRAINT [FK_153] FOREIGN KEY ([jtar_resource_id])  REFERENCES [dbo].[Resource]([r_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_149] ON [dbo].[JT_Activity_Resource] 
 (
  [jtar_activity_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_153] ON [dbo].[JT_Activity_Resource] 
 (
  [jtar_resource_id] ASC
 )

GO


-- ************************************** [dbo].[JT_Post_Person]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='JT_Post_Person')
CREATE TABLE [dbo].[JT_Post_Person]
(
 [jtpp_person_id]       int NOT NULL ,
 [jtpp_post_id]         int NOT NULL ,
 [jtpp_created_at]      datetimeoffset(7) NOT NULL ,
 [jtpp_last_modified_at] datetimeoffset(7) NOT NULL ,
 [jtpp_end_of_post]     datetimeoffset(7) NULL ,


 CONSTRAINT [PK_JT_Post_Person] PRIMARY KEY CLUSTERED ([jtpp_person_id] ASC, [jtpp_post_id] ASC),
 CONSTRAINT [FK_172] FOREIGN KEY ([jtpp_person_id])  REFERENCES [dbo].[Person]([p_id]),
 CONSTRAINT [FK_176] FOREIGN KEY ([jtpp_post_id])  REFERENCES [dbo].[Post]([p_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_172] ON [dbo].[JT_Post_Person] 
 (
  [jtpp_person_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_176] ON [dbo].[JT_Post_Person] 
 (
  [jtpp_post_id] ASC
 )

GO

-- ************************************** [dbo].[JT_Person_Company]

IF NOT EXISTS (SELECT * FROM sys.tables t join sys.schemas s ON (t.schema_id = s.schema_id) WHERE s.name='dbo' and t.name='JT_Person_Company')
CREATE TABLE [dbo].[JT_Person_Company]
(
 [jtpc_company_id]       int NOT NULL ,
 [jtpc_person_id]        int NOT NULL ,
 [jtpc_created_at]       datetimeoffset(7) NOT NULL ,
 [jtpc_last_modified_at] datetimeoffset(7) NOT NULL ,
 [jtpc_end_of_contract]  datetimeoffset(7) NULL ,


 CONSTRAINT [PK_JT_Person_Company] PRIMARY KEY CLUSTERED ([jtpc_company_id] ASC, [jtpc_person_id] ASC),
 CONSTRAINT [FK_116] FOREIGN KEY ([jtpc_company_id])  REFERENCES [dbo].[Company]([c_id]),
 CONSTRAINT [FK_120] FOREIGN KEY ([jtpc_person_id])  REFERENCES [dbo].[Person]([p_id])
);
GO


CREATE NONCLUSTERED INDEX [fkIdx_116] ON [dbo].[JT_Person_Company] 
 (
  [jtpc_company_id] ASC
 )

GO

CREATE NONCLUSTERED INDEX [fkIdx_120] ON [dbo].[JT_Person_Company] 
 (
  [jtpc_person_id] ASC
 )

GO


-- Après avoir rempli toute les ressources et les métiers

/*_____________________________________________________________________________*/
if exists (select * from sysobjects where id = object_id('CREATE_RESOURCE'))
 DROP PROCEDURE CREATE_RESOURCE
GO
CREATE PROCEDURE CREATE_RESOURCE
   @resource_type            Int,
   @resource_status          Int,
   @resource_name_FR         Varchar(255),
   @resource_name_EN         Varchar(255)
AS
 /*------------------------------------------------------------------------
  06/04/20 JV : Création
  --------------------------------------------------------------------------*/
  Begin
	DECLARE @id_FR int;
	DECLARE @id_EN int;

	INSERT INTO dbo.Resource_label_FR ( rl_FR_name )
	VALUES(@resource_name_FR);
	set @id_FR = SCOPE_IDENTITY();

	INSERT INTO dbo.Resource_label_EN ( rl_EN_name )
	VALUES(@resource_name_EN);
	set @id_EN = SCOPE_IDENTITY();

	INSERT INTO dbo.Resource (r_fk_resource_type_id, r_fk_resource_status_id, r_uuid, r_created_at, r_last_modified_at, r_name_FR, r_name_EN)
	VALUES (@resource_type, @resource_status, NEWID(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @id_FR, @id_EN)
  End
GO

exec CREATE_RESOURCE 1, 2, 'Gérer le personnel musical', 'Manage musical staff'
exec CREATE_RESOURCE 1, 2, 'Assister techniquement des opérateurs et établir des rapports de production et d''incidents', 'Technically assist operators and draw up production and incident reports'
exec CREATE_RESOURCE 1, 2, 'Usiner et de mettre en forme des pièces en bois (débit, dégauchissage, moulurage, sculpture, cintrage, ...)', 'Machining and shaping wooden parts'
exec CREATE_RESOURCE 1, 2, 'Déterminer des caractéristiques de gabarits (formes, dimensions) pour le montage de nouveaux produits', 'Determine template characteristics (shapes, dimensions) for mounting new products'
exec CREATE_RESOURCE 1, 2, 'Réaliser à dimension des caisses ou des emballages et y déposer/caler des objets, des marchandises', 'Make boxes or packaging to size and drop / wedge objects, goods'
exec CREATE_RESOURCE 1, 2, 'Modifier un programme pré-établi (codage-décodage) ou concevoir un programme de base de fabrication (conversion de plan, référentiel pièce, ...)', 'Modify a pre-established program (coding-decoding) or design a basic manufacturing program (plan conversion, part repository, ...)'
exec CREATE_RESOURCE 1, 2, 'Vérifier et remplacer des outils, des outillages sur des équipements de production', 'Check and replace tools, tools on production equipment'
exec CREATE_RESOURCE 1, 2, 'Façonner des éléments en bois sur machine traditionnelle (toupie plate, volante, chantourneuse, ...) en guidant manuellement l''outil ou la pièce', 'Shaping wooden elements on a traditional machine (flat, flying, frying router, ...) by manually guiding the tool or the part'
exec CREATE_RESOURCE 1, 2, 'Régler des équipements (autoclaves, étuves, ...) de traitement du bois (séchage, préservation, ...) et surveiller leur fonctionnement', 'Adjust equipment (autoclaves, ovens, ...) for wood treatment (drying, preservation, ...) and monitor their operation'
exec CREATE_RESOURCE 1, 2, 'Conditionner les panneaux à base de bois (répartition par lots, cerclage, filmage)', 'Condition wood-based panels (batch distribution, strapping, filming)'
exec CREATE_RESOURCE 1, 2, 'Coordonner et planifier des interventions de maintenance selon les impératifs de production', 'Coordinate and plan maintenance interventions according to production requirements'
exec CREATE_RESOURCE 1, 2, 'Réceptionner des grumes (classement, triage, ...) et les stocker selon l''essence et l''utilisation', 'Receive logs (grading, sorting, ...) and store them according to species and use'
exec CREATE_RESOURCE 1, 2, 'Surveiller des machines ou équipements de première transformation du bois (scieuse, tronçonneuse, écorceuse, ...) à partir d''une salle de contrôle ou d''une cabine de pilotage', 'Monitor machines or equipment for the primary processing of wood (saws, chainsaws, debarkers, etc.) from a control room or a cockpit'
exec CREATE_RESOURCE 1, 2, 'Réaliser des opérations de valorisation de produits issus du sciage (délignage, tronçonnage, corroyage, assemblage, ...)', 'Carry out recovery operations for products from sawing (edging, parting off, working, assembly, ...)'
exec CREATE_RESOURCE 1, 2, 'Conditionner des produits issus de la première transformation du bois (bottelage, cerclage) et procéder à leur chargement', 'Packaging products from the first transformation of wood (bundling, strapping) and loading them'
exec CREATE_RESOURCE 1, 2, 'Fendre une grume à merrain (tonnellerie, ...)', 'Split a stave log (cooperage, ...)'
exec CREATE_RESOURCE 1, 2, 'Préparer des supports (murs, bâtis, ...) et réaliser des travaux de pose de revêtements, peinture, branchements électriques, ...', 'Prepare supports (walls, frames, ...) and carry out work to install coatings, paint, electrical connections, ...'
exec CREATE_RESOURCE 1, 2, 'Réaliser des opérations de restauration sur des ouvrages anciens', 'Carry out restoration operations on old structures'
exec CREATE_RESOURCE 1, 2, 'Concevoir des agencements ou des menuiseries à partir de plans', 'Design layouts or joinery from plans'
exec CREATE_RESOURCE 1, 2, 'Réaliser des maquettes/prototypes de nouveaux modèles en vue de la fabrication en série', 'Make models / prototypes of new models for mass production'

/*_____________________________________________________________________________*/
if exists (select * from sysobjects where id = object_id('CREATE_JOB'))
 DROP PROCEDURE CREATE_JOB
GO
CREATE PROCEDURE CREATE_JOB
   @job_rome_code       Varchar(50),
   @job_name_FR         Varchar(255),
   @job_name_EN         Varchar(255)
AS
 /*------------------------------------------------------------------------
  09/04/20 JV : Création
  --------------------------------------------------------------------------*/
  Begin
	DECLARE @id_FR int;
	DECLARE @id_EN int;

	INSERT INTO dbo.Job_label_FR ( jl_FR_name )
	VALUES(@job_name_FR);
	set @id_FR = SCOPE_IDENTITY();

	INSERT INTO dbo.Job_label_EN ( jl_EN_name )
	VALUES(@job_name_EN);
	set @id_EN = SCOPE_IDENTITY();

	INSERT INTO dbo.Job (j_rome_code, j_uuid, j_created_at, j_last_modified_at, j_name_FR, j_name_EN)
	VALUES (@job_rome_code , NEWID(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @id_FR, @id_EN)
  End
GO

exec CREATE_JOB 'G1202', 'Animateur / Animatrice éco interprète', 'Eco Interpreter Animator'
exec CREATE_JOB 'G1202', 'Animateur / Animatrice nature environnement', 'Nature environment animator'
exec CREATE_JOB 'G1202', 'Animateur / Animatrice séjour de vacances pour personnes handicapées', 'Holiday leader for disabled people'
exec CREATE_JOB 'G1202', 'Animateur conseiller / Animatrice conseillère en Technologies de l''Information et de la Communication -TIC-', 'Information and Communication Technologies Consultant -CTC-'
exec CREATE_JOB 'G1202', 'Conseiller médiateur / Conseillère médiatrice en numérique', 'Digital Mediator Advisor'
exec CREATE_JOB 'G1202', 'Facilitateur / Facilitatrice de FabLab - laboratoire de fabrication numérique', 'FabLab Facilitator - digital manufacturing laboratory'
exec CREATE_JOB 'G1202', 'Intervenant / Intervenante en Tai Chi', 'Tai Chi practitioner'
exec CREATE_JOB 'G1202', 'Professeur / Professeure de yoga', 'Yoga teacher'
exec CREATE_JOB 'G1202', 'Responsable d''animation en centre de vacances', 'Holiday center manager'
exec CREATE_JOB 'G1202', 'Responsable d''espace de médiation numérique', 'Digital mediation manager'
exec CREATE_JOB 'C1504', 'Négociateur / Négociatrice immobilier en bureau de vente', 'Real Estate Negotiator in Sales Office'
exec CREATE_JOB 'C1504', 'Prospecteur négociateur / Prospectrice négociatrice en immobilier', 'Prospector negotiator / Prospector negotiator in real estate'
exec CREATE_JOB 'C1504', 'Responsable d''agence immobilière', 'Real estate agency manager'
exec CREATE_JOB 'C1504', 'Responsable de clientèle en transaction immobilière', 'Customer manager in real estate transaction'
exec CREATE_JOB 'C1504', 'Responsable de vente immobilière', 'Real estate sales manager'
exec CREATE_JOB 'C1504', 'Vendeur / Vendeuse en immobilier neuf', 'New real estate salesperson'
exec CREATE_JOB 'C1504', 'Vendeur / Vendeuse immobilier', 'Real estate salesperson'


if exists (select * from sysobjects where id = object_id('CREATE_ACTIVITY'))
 DROP PROCEDURE CREATE_ACTIVITY
GO
CREATE PROCEDURE CREATE_ACTIVITY
   @activity_name_FR         Varchar(255),
   @activity_name_EN         Varchar(255)
AS
 /*------------------------------------------------------------------------
  09/04/20 JV : Création
  --------------------------------------------------------------------------*/
  Begin
	DECLARE @id_FR int;
	DECLARE @id_EN int;

	INSERT INTO dbo.Activity_label_FR ( al_FR_name )
	VALUES(@activity_name_FR);
	set @id_FR = SCOPE_IDENTITY();

	INSERT INTO dbo.Activity_label_EN ( al_EN_name )
	VALUES(@activity_name_EN);
	set @id_EN = SCOPE_IDENTITY();

	INSERT INTO dbo.Activity (a_uuid, a_created_at, a_last_modified_at, a_name_FR, a_name_EN)
	VALUES (NEWID(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @id_FR, @id_EN)
  End
GO


exec CREATE_ACTIVITY 'Planifier un chantier', 'Plan a construction site'
exec CREATE_ACTIVITY 'Gérer une équipe', 'Manage a team'
exec CREATE_ACTIVITY 'Gérer un budger', 'Manage a budget'
exec CREATE_ACTIVITY 'Conseiller un client', 'Advise a client'


CREATE FULLTEXT CATALOG AdvWksDocFTCat; 

CREATE FULLTEXT INDEX ON dbo.Resource_label_FR  
(  
    rl_FR_name
        Language 1036
)  
KEY INDEX PK_Resource_label_FR ON AdvWksDocFTCat 
WITH CHANGE_TRACKING AUTO
GO

CREATE FULLTEXT INDEX ON dbo.Resource_label_EN  
(  
    rl_EN_name
        Language 2057
)  
KEY INDEX PK_Resource_label_EN ON AdvWksDocFTCat 
WITH CHANGE_TRACKING AUTO
GO 

CREATE FULLTEXT INDEX ON dbo.Activity_label_FR
(  
    al_FR_name
        Language 1036
)  
KEY INDEX PK_Activity_label_FR ON AdvWksDocFTCat 
WITH CHANGE_TRACKING AUTO
GO 

CREATE FULLTEXT INDEX ON dbo.Activity_label_EN  
(  
    al_EN_name
        Language 2057
)  
KEY INDEX PK_Activity_label_EN ON AdvWksDocFTCat 
WITH CHANGE_TRACKING AUTO
GO

CREATE FULLTEXT INDEX ON dbo.Job_label_FR  
(  
    jl_FR_name
        Language 1036
)  
KEY INDEX PK_Job_label_FR ON AdvWksDocFTCat 
WITH CHANGE_TRACKING AUTO
GO 

CREATE FULLTEXT INDEX ON dbo.Job_label_EN  
(  
    jl_FR_name
        Language 2057
)  
KEY INDEX PK_Job_label_EN ON AdvWksDocFTCat 
WITH CHANGE_TRACKING AUTO
GO 




















