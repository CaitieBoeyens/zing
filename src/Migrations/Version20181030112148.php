<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181030112148 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('DROP SEQUENCE user_info_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE login_id_seq CASCADE');
        $this->addSql('CREATE TABLE question_question_topic (question_id INT NOT NULL, question_topic_id INT NOT NULL, PRIMARY KEY(question_id, question_topic_id))');
        $this->addSql('CREATE INDEX IDX_458B5AE61E27F6BF ON question_question_topic (question_id)');
        $this->addSql('CREATE INDEX IDX_458B5AE67C5D9031 ON question_question_topic (question_topic_id)');
        $this->addSql('ALTER TABLE question_question_topic ADD CONSTRAINT FK_458B5AE61E27F6BF FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_question_topic ADD CONSTRAINT FK_458B5AE67C5D9031 FOREIGN KEY (question_topic_id) REFERENCES question_topic (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE user_info');
        $this->addSql('DROP TABLE login');
        $this->addSql('DROP TABLE question_topic_question');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE user_info_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE login_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE user_info (id INT NOT NULL, email VARCHAR(255) NOT NULL, username VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE login (id INT NOT NULL, username VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE question_topic_question (question_topic_id INT NOT NULL, question_id INT NOT NULL, PRIMARY KEY(question_topic_id, question_id))');
        $this->addSql('CREATE INDEX idx_a8e651b17c5d9031 ON question_topic_question (question_topic_id)');
        $this->addSql('CREATE INDEX idx_a8e651b11e27f6bf ON question_topic_question (question_id)');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT fk_a8e651b17c5d9031 FOREIGN KEY (question_topic_id) REFERENCES question_topic (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE question_topic_question ADD CONSTRAINT fk_a8e651b11e27f6bf FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE question_question_topic');
    }
}
