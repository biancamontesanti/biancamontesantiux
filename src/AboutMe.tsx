// AboutMe.tsx
import React, { useState, useRef } from 'react';
import './AboutMe.css';

interface Education {
  year: string;
  degree: string;
  institution: string;
  description: string;
}

interface Experience {
  year: string;
  position: string;
  company: string;
  description: string;
}

const AboutMe: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'education' | 'experience'>('education');
  const contentRef = useRef<HTMLDivElement>(null);

  const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'React Native', 'R3F', 'Node.js', 'Inglês', 'SQL', 'Figma', 'Spline'];

  const educationData: Education[] = [
    {
      year: '2018 - 2023',
      degree: 'Bacharel em Administração',
      institution: 'Universidade Paulista',
      description: 'CRA - 1553314'
    },
    {
        year: '2023',
        degree: 'Scrum Fundamentals',
        institution: 'SCRUMstudy',
        description: 'Accreditation Body for Scrum and Agile'
      },
      {
        year: '2022',
        degree: 'Principios do Marketing Digital',
        institution: 'Google',
        description: 'Domine as noções de marketing digital'
      },
    // Add more education items as needed
  ];

  const experienceData: Experience[] = [
    {
      year: '2018 - 2019',
      position: 'Analista de Banco de Dados e Atendimento ao Cliente',
      company: 'BASCODE',
      description: 'Gerenciou e manteve bancos de dados, garantindo a integridade e segurança dos dados armazenados.'
    },
    {
        year: '2020 - 2021',
        position: 'Desenvolvedora Junior',
        company: 'SOUND CLUB LIVE',
        description: 'Atuou como desenvolvedora júnior no projeto Soundclub Live, contribuindo para o desenvolvimento e manutenção do aplicativo móvel utilizando React Native.'
      },

      {
        year: '2021 - 2022',
        position: 'Project Manager',
        company: 'SOUND CLUB LIVE',
        description: 'Gerenciou o projeto, alinhando as equipes de marketing, design e desenvolvimento para garantir que todas as partes estivessem em sincronia e os objetivos fossem alcançados.'
      },

    // Add more experience items as needed
  ];


  return (
    <div className="about-me">
      <div className="content-wrapper" ref={contentRef}>
        <section id="about">
          <h2>Sobre mim</h2>
          <p className="bio">
          Sou uma profissional multifacetada, com uma sólida base em habilidades técnicas e interpessoais. Minha paixão por tecnologia, aliada a uma mente criativa e visual, me impulsiona a criar soluções inovadoras que proporcionam experiências memoráveis aos usuários.
          </p>
         
        </section>

      

        <section id="skills">
          <h3>Skills</h3>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section id="education-experience">
          <div className="toggle-buttons">
            <button 
              className={activeSection === 'education' ? 'active' : ''}
              onClick={() => setActiveSection('education')}
            >
              Education
            </button>
            <button 
              className={activeSection === 'experience' ? 'active' : ''}
              onClick={() => setActiveSection('experience')}
            >
              Experience
            </button>
          </div>

          {activeSection === 'education' && (
            <div className="timeline-section">
              <h3>Education</h3>
              <ul className="timeline">
                {educationData.map((edu, index) => (
                  <li key={index}>
                    <span className="year">{edu.year}</span>
                    <h4>{edu.degree}</h4>
                    <h5>{edu.institution}</h5>
                    <p>{edu.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === 'experience' && (
            <div className="timeline-section">
              <h3>Experience</h3>
              <ul className="timeline">
                {experienceData.map((exp, index) => (
                  <li key={index}>
                    <span className="year">{exp.year}</span>
                    <h4>{exp.position}</h4>
                    <h5>{exp.company}</h5>
                    <p>{exp.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section id="contact">
        <h3>Contato</h3>
          <p className="contato">
          (11) 98802-9023
          </p>
        </section>
        
      </div>
    </div>
  );
};

export default AboutMe;