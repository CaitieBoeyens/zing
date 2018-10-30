<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181030070842 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE user_info_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE login_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE user_profile_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE question_topic_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE user_profile (id INT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(64) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D95AB405F85E0677 ON user_profile (username)');
        $this->addSql('CREATE TABLE question (id INT NOT NULL, user_id INT NOT NULL, title VARCHAR(255) NOT NULL, body TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B6F7494EA76ED395 ON question (user_id)');
        $this->addSql('CREATE TABLE question_topic (id INT NOT NULL, tag VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE question_topic_question (question_topic_id INT NOT NULL, question_id INT NOT NULL, PRIMARY KEY(question_topic_id, question_id))');
        $this->addSql('CREATE INDEX IDX_A8E651B17C5D9031 ON question_topic_question (question_topic_id)');
        $this->addSql('CREATE INDEX IDX_A8E651B11E27F6BF ON question_topic_question (question_id)');
        $this->addSql('CREATE TABLE avatar (id INT NOT NULL, user_id INT NOT NULL, active BOOLEAN NOT NULL, url VARCHAR(255) NOT NULL, file VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1677722FA76ED395 ON avatar (user_id)');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT FK_A8E651B17C5D9031 FOREIGN KEY (question_topic_id) REFERENCES question_topic (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT FK_A8E651B11E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE avatar ADD CONSTRAINT FK_1677722FA76ED395 FOREIGN KEY (user_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE login');
        $this->addSql('ALTER TABLE response ADD CONSTRAINT FK_3E7B0BFB4FAF8F53 FOREIGN KEY (question_id_id) REFERENCES question (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494EA76ED395');
        $this->addSql('ALTER TABLE avatar DROP CONSTRAINT FK_1677722FA76ED395');
        $this->addSql('ALTER TABLE response DROP CONSTRAINT FK_3E7B0BFB4FAF8F53');
        $this->addSql('ALTER TABLE question_topic_question DROP CONSTRAINT FK_A8E651B11E27F6BF');
        $this->addSql('ALTER TABLE question_topic_question DROP CONSTRAINT FK_A8E651B17C5D9031');
        $this->addSql('DROP SEQUENCE user_profile_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE question_topic_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE user_info_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE login_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE login (id INT NOT NULL, username VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE user_profile');
        $this->addSql('DROP TABLE question');
        $this->addSql('DROP TABLE question_topic');
        $this->addSql('DROP TABLE question_topic_question');
        $this->addSql('DROP TABLE avatar');
    }
}
