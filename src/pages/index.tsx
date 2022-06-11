/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import {
  Flex, FlexProps, Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ContextQuestions from '../components/atomic/molecules/ContextQuestions';
import CardColors from '../components/atomic/molecules/Card/CardColors';
import BigCard from '../components/atomic/molecules/Card/CardMap';
import DescriptionColumn from '../components/atomic/molecules/DescrioptionColumn';

import getProfiles from '../axios';

export default function Home() {
  const [age, setAge] = useState('');
  const [educationLevel, setEducationLevel] = useState('');

  const [profiles, setProfiles] = useState<any>({});
  const [targetProfile, setTargetProfile] = useState<any>({});
  const [ageIntervalsOfProfile, setAgeIntervalsOfProfile] = useState([]);
  const [sexPercentages, setSexPercentages] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [impairmentsPercentage, setImpairmentsPercentage] = useState([]);
  const [mapsPercentage, setMapsPercentage] = useState([]);

  useEffect(() => {
    syncProfiles();
  }, []);

  const syncProfiles = async () => {
    const profilesResponse:any = await getProfiles();
    setProfiles(profilesResponse?.data);
    // console.log('profilesResponse?.data------------');
    // console.log(profilesResponse?.data);
  };

  function inputsAreFilled():boolean {
    if (
      age !== ''
      && age !== null
      && educationLevel !== ''
      && educationLevel !== null
    ) return true;
    return false;
  }

  useEffect(() => {
    console.log('-----------------------');
    console.log('age:  ', age);
    console.log('educationLevel:  ', educationLevel);

    console.log('profiles');
    console.log(profiles);

    if (inputsAreFilled() && profiles !== {}) {
      const educationLevelOptions = {
        education_level_alfabetizado: 'alfabetizado',
        education_level_Ens_Fundamental_Completo: 'Ens. Fundamental Completo',
        education_level_Ens_Médio_Completo: 'Ens. Médio Completo',
        education_level_Ens_Superior_Completo: 'Ens. Superior Completo',
        education_level_Pós_Graduação_Completo: 'Pós-Graduação Completo',
      };

      const ageIntervalOptions = {
        age_interval_0_10: '0-10',
        age_interval_11_20: '11-20',
        age_interval_21_30: '21-30',
        age_interval_31_40: '31-40',
        age_interval_41_50: '41-50',
        age_interval_51_plus: '50+',
      };

      const othersProfiles = profiles?.slice(1, profiles?.length);
      let resultProfile :any = {};

      othersProfiles?.map((profile) => {
        // console.log('.');
        // console.log(educationLevelOptions[profile.education_level_of_profile], educationLevel);
        // console.log(ageIntervalOptions[profile.interval_age_of_profile], age);

        if (educationLevelOptions[profile.education_level_of_profile] === educationLevel
          && ageIntervalOptions[profile.interval_age_of_profile] === age
        ) {
          // console.log('profileChoose');
          resultProfile = profile;
        }
      });
      if (!resultProfile?.total_answers) {
        resultProfile = profiles[0];
      }

      setTargetProfile(resultProfile);
    }
  }, [age, educationLevel]);

  useEffect(() => {
    setAgeIntervalsOfProfile(getMostThreeAgeInterval(targetProfile));
    setSexPercentages(getSexPercentages(targetProfile));
    setScholarships(getScholarship(targetProfile));
    setImpairmentsPercentage(getImpairmentsPercentage(targetProfile));
    setMapsPercentage(getMaps(targetProfile));
  }, [targetProfile]);

  const totalAnswers = targetProfile?.total_answers;

  const percentWarmColorScheme = getPercentage(targetProfile?.color_scheme_Quente, totalAnswers);
  const percentColdColorScheme = getPercentage(targetProfile?.color_scheme_Frio, totalAnswers);
  const percentNeutralColorScheme = getPercentage(targetProfile?.color_scheme_Neutro, totalAnswers);
  const percentDark = getPercentage(targetProfile?.background_color_dark, totalAnswers);
  const percentLight = getPercentage(targetProfile?.background_color_white, totalAnswers);

  return (

    <Flex direction="column" maxH="100vh" bg="#3769FF" px="0" w="100vw" overflowY="hidden">
      <Flex bg="#315FE5" w="100%">

        <ContextQuestions
          age={age}
          setAge={setAge}
          educationLevel={educationLevel}
          setEducationLevel={setEducationLevel}
        />

      </Flex>

      {age !== '' && educationLevel !== '' && targetProfile !== {} ? (

        <Flex {...QuestionaryTemplateContainer}>

          <Flex
            direction={{ base: 'column', '2xl': 'row' }}
            justifyContent="center"
            alignItems="center"
            h="100%"
          >

            <Flex h="690px">

              <Flex direction="column">
                <Flex
                  h="100%"
                  w="550px"
                  bg="white"
                  color="#315FE5"
                  m="10px"
                  borderRadius="15px"
                  justifyContent="center"
                  alignItems="center"
                  p="42px"
                >
                  <Text fontSize="30px" fontWeight="bold">

                    {targetProfile.total_answers === 43
                      ? 'Não foi possível obter este perfil, exibindo dados gerais'
                      : `Dados do perfil originados da combinação dos marcadores Faixa etária: ${age} e Escolaridade: ${educationLevel}`}

                  </Text>

                </Flex>

                <CardColors
                  line1={{ colors: 'warm', name: 'Quente', percent: percentWarmColorScheme }}
                  line2={{ colors: 'cold', name: 'Frio', percent: percentColdColorScheme }}
                  line3={{ colors: 'neutral', name: 'Neutro', percent: percentNeutralColorScheme }}
                  percentDark={percentDark}
                  percentLight={percentLight}
                />
              </Flex>

              <DescriptionColumn
                ageIntervalsOfProfile={
                  ageIntervalsOfProfile
              }
                sexPercentages={
                  sexPercentages
                }
                scholarships={
                  scholarships
                }
                impairmentsPercentage={
                  impairmentsPercentage
                }
              />
            </Flex>
            <Flex h="690px">

              <BigCard isBigCard mapPercentage={mapsPercentage[0]} />
              <Flex direction="column">
                <Flex h="100%" w="550px" bg="#315FE5" m="10px" borderRadius="15px" justifyContent="center">
                  <Text fontSize="70px" fontWeight="bold">{ targetProfile.total_answers}</Text>
                  <Text fontSize="70px" color="#eeeeee" ml="10px">{ targetProfile.total_answers > 1 ? 'Respostas' : 'Resposta'}</Text>
                </Flex>
                <Flex>

                  <BigCard mapPercentage={mapsPercentage[1]} />
                  <BigCard mapPercentage={mapsPercentage[2]} />
                  <BigCard mapPercentage={mapsPercentage[3]} />

                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex backgroundImage="/coverbackground.svg" backgroundSize="cover" width="100vw" height="100vh" />

      )}
    </Flex>

  );
}

const QuestionaryTemplateContainer: FlexProps = {
  width: '100vw',
  height: '100vh',
  minH: { base: '1800px', '2xl': '100%' },
  background: 'blue',
  maxWidth: '100%',
  textAlign: 'center',
  direction: 'column',
  color: 'white',
};

const getPercentage = (x, total) => ((x / total) * 100).toPrecision(4);

const getSexPercentages = (targetProfile) => {
  const totalAnswers = targetProfile?.total_answers;
  const sex_Feminino = targetProfile?.sex_Feminino;
  const sex_Masculino = targetProfile?.sex_Masculino;
  return [
    ['Masculino:', getPercentage(sex_Masculino, totalAnswers)],
    ['Feminino:', getPercentage(sex_Feminino, totalAnswers)],
  ];
};

const getMostThreeAgeInterval = (

  targetProfile,
) => {
  const ageIntervals = {
    age_interval_0_10: targetProfile?.age_interval_0_10,
    age_interval_11_20: targetProfile?.age_interval_11_20,
    age_interval_21_30: targetProfile?.age_interval_21_30,
    age_interval_31_40: targetProfile?.age_interval_31_40,
    age_interval_41_50: targetProfile?.age_interval_41_50,
    age_interval_51_plus: targetProfile?.age_interval_51_plus,
  };

  const formatedAgeLabels = {
    age_interval_0_10: '0-10',
    age_interval_11_20: '11-20',
    age_interval_21_30: '21-30',
    age_interval_31_40: '31-40',
    age_interval_41_50: '41-50',
    age_interval_51_plus: '51+',
  };

  const ageIntervalsAux = {
    age_interval_0_10: targetProfile?.age_interval_0_10,
    age_interval_11_20: targetProfile?.age_interval_11_20,
    age_interval_21_30: targetProfile?.age_interval_21_30,
    age_interval_31_40: targetProfile?.age_interval_31_40,
    age_interval_41_50: targetProfile?.age_interval_41_50,
    age_interval_51_plus: targetProfile?.age_interval_51_plus,
  };

  const getKeyOfMaxValue = (obj) => Object?.keys(obj)?.reduce((a, b) => (obj[a] > obj[b] ? a : b));

  const firstAge = getKeyOfMaxValue(ageIntervalsAux);
  delete ageIntervalsAux[firstAge];
  const secondAge = getKeyOfMaxValue(ageIntervalsAux);
  delete ageIntervalsAux[secondAge];
  const thirdAge = getKeyOfMaxValue(ageIntervalsAux);

  const totalAnswers = targetProfile?.total_answers;

  return [
    [formatedAgeLabels[firstAge], getPercentage(ageIntervals[firstAge], totalAnswers)],
    [formatedAgeLabels[secondAge], getPercentage(ageIntervals[secondAge], totalAnswers)],
    [formatedAgeLabels[thirdAge], getPercentage(ageIntervals[thirdAge], totalAnswers)],
  ];
};

const getScholarship = (
  targetProfile,
) => {
  const educations = {
    education_level_Ens_Fundamental_Completo: targetProfile?.education_level_Ens_Fundamental_Completo,
    education_level_Ens_Médio_Completo: targetProfile?.education_level_Ens_Médio_Completo,
    education_level_Ens_Superior_Completo: targetProfile?.education_level_Ens_Superior_Completo,
    education_level_Pós_Graduação_Completo: targetProfile?.education_level_Pós_Graduação_Completo,
    education_level_alfabetizado: targetProfile?.education_level_alfabetizado,

  };

  const labels = {
    education_level_Ens_Fundamental_Completo: 'Ensino fundamental completo:',
    education_level_Ens_Médio_Completo: 'Ensino médio completo:',
    education_level_Ens_Superior_Completo: 'Ensino superior completo:',
    education_level_Pós_Graduação_Completo: 'Pós graduação completo:',
    education_level_alfabetizado: 'Alfabetizado:',
  };

  const educationsAux = {
    education_level_Ens_Fundamental_Completo: targetProfile?.education_level_Ens_Fundamental_Completo,
    education_level_Ens_Médio_Completo: targetProfile?.education_level_Ens_Médio_Completo,
    education_level_Ens_Superior_Completo: targetProfile?.education_level_Ens_Superior_Completo,
    education_level_Pós_Graduação_Completo: targetProfile?.education_level_Pós_Graduação_Completo,
    education_level_alfabetizado: targetProfile?.education_level_alfabetizado,
  };

  const getKeyOfMaxValue = (obj) => Object?.keys(obj)?.reduce((a, b) => (obj[a] > obj[b] ? a : b));

  const firstAge = getKeyOfMaxValue(educationsAux);
  delete educationsAux[firstAge];
  const secondAge = getKeyOfMaxValue(educationsAux);

  const totalAnswers = targetProfile?.total_answers;

  return [
    [labels[firstAge], getPercentage(educations[firstAge], totalAnswers)],
    [labels[secondAge], getPercentage(educations[secondAge], totalAnswers)],
  ];
};

const getImpairmentsPercentage = (targetProfile) => {
  const totalAnswers = targetProfile?.total_answers;
  const visual_impairment_Astgmatismo = targetProfile?.visual_impairment_Astgmatismo;
  const visual_impairment_Miopia = targetProfile?.visual_impairment_Miopia;
  const visual_impairment_nenhuma = targetProfile?.visual_impairment_nenhuma;

  return [
    ['Astgmatismo:', getPercentage(visual_impairment_Astgmatismo, totalAnswers)],
    ['Miopia:', getPercentage(visual_impairment_Miopia, totalAnswers)],
    ['Nenhuma:', getPercentage(visual_impairment_nenhuma, totalAnswers)],

  ];
};

const getMaps = (
  targetProfile,
) => {
  // const bar_acc_amount = targetProfile?.bar_acc_amount;
  // const circ_acc_amount = targetProfile?.circ_acc_amount;
  // const squared_acc_amount = targetProfile?.squared_acc_amount;
  // const line_acc_amount = targetProfile?.line_acc_amount;

  const maps = {
    fitness_bar: targetProfile?.fitness_bar,
    fitness_circ: targetProfile?.fitness_circ,
    fitness_line: targetProfile?.fitness_line,
    fitness_squared: targetProfile?.fitness_squared,
  };

  const labels = {
    fitness_bar: 'BarMap',
    fitness_circ: 'CircMap',
    fitness_squared: 'SquaredMap',
    fitness_line: 'LineMap',
  };

  const accuracyQuestionLabels = {
    fitness_bar: 'bar',
    fitness_circ: 'circ',
    fitness_squared: 'squared',
    fitness_line: 'line',

  };

  const mapsAux = {
    fitness_bar: targetProfile?.fitness_bar,
    fitness_circ: targetProfile?.fitness_circ,
    fitness_line: targetProfile?.fitness_line,
    fitness_squared: targetProfile?.fitness_squared,

  };

  const getKeyOfMaxValue = (obj) => Object?.keys(obj)?.reduce((a, b) => (obj[a] > obj[b] ? a : b));

  const first = getKeyOfMaxValue(mapsAux);
  delete mapsAux[first];
  const second = getKeyOfMaxValue(mapsAux);
  delete mapsAux[second];
  const third = getKeyOfMaxValue(mapsAux);
  delete mapsAux[third];
  const fourth = getKeyOfMaxValue(mapsAux);

  const totalAnswers = targetProfile?.total_answers;

  // console.log('firstmap  ------------ ');
  // console.log([labels[first], getPercentage(maps[first], totalAnswers * 150), getPercentage(accurcy[first], totalAnswers * 4)]);

  const getIsolatePercentPerQuestion = (map) => ({
    acc_amount_3_sections: getPercentage(targetProfile?.[`${map}_acc_amount_3_sections`], totalAnswers * 2), // São duas questões para 3 seções
    acc_amount_5_sections: getPercentage(targetProfile?.[`${map}_acc_amount_5_sections`], totalAnswers),
    acc_amount_7_sections: getPercentage(targetProfile?.[`${map}_acc_amount_7_sections`], totalAnswers),
  });

  const getQuality = (map) => {
    const quality = targetProfile?.[`quality_${map}`] / totalAnswers;

    if (quality < 50) {
      if (quality < 25) {
        if (quality < 0) {
          if (quality < -25) {
            return 'Muito Difícil';
          }
          return 'Difícil';
        }
        return 'Ok';
      }
      return 'Fácil';
    }
    return 'Muito Fácil';
  };

  return [
    // label | % indicação | % acertos | % por questão
    [labels[first], getPercentage(maps[first], totalAnswers * 150), getIsolatePercentPerQuestion(accuracyQuestionLabels[first]), getQuality(accuracyQuestionLabels[first])],
    [labels[second], getPercentage(maps[second], totalAnswers * 150), getIsolatePercentPerQuestion(accuracyQuestionLabels[second]), getQuality(accuracyQuestionLabels[second])],
    [labels[third], getPercentage(maps[third], totalAnswers * 150), getIsolatePercentPerQuestion(accuracyQuestionLabels[third]), getQuality(accuracyQuestionLabels[third])],
    [labels[fourth], getPercentage(maps[fourth], totalAnswers * 150), getIsolatePercentPerQuestion(accuracyQuestionLabels[fourth]), getQuality(accuracyQuestionLabels[fourth])],
  ];
};
