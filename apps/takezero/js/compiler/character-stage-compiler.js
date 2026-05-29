function buildCharacterSection() {
            const s = state;
            const gd = genderLabel(s.gender);
            const isFemale = s.gender > 60;
            const ageEntry = getAge(s.age);

            // 인종 — 미선택 시 완전 생략
            let raceDesc = '';
            if (s.activeMix) {
                const mixCA = s.race.mixCA || 0;
                const mixBA = s.race.mixBA || 0;
                const mixCB = s.race.mixCB || 0;
                const tier1key = s.race.tier1 === '동양인' ? 'eastern' : s.race.tier1 === '백인/라틴' ? 'caucasian' : 'black';
                const baseEn = (RACE_TIER2[tier1key] || []).find(r => r.ko === s.race.tier2)?.en || s.race.tier1 || 'Asian';
                if (s.activeMix === 'ca') raceDesc = `(Caucasian:${(mixCA/100).toFixed(2)}, ${baseEn}:${((100-mixCA)/100).toFixed(2)}) biracial`;
                else if (s.activeMix === 'ba') raceDesc = `(Black:${(mixBA/100).toFixed(2)}, ${baseEn}:${((100-mixBA)/100).toFixed(2)}) blasian`;
                else if (s.activeMix === 'cb') raceDesc = `(Caucasian:${(mixCB/100).toFixed(2)}, Black:${((100-mixCB)/100).toFixed(2)}) mixed race`;
            } else if (s.race.tier2) {
                const tier1key = s.race.tier1 === '동양인' ? 'eastern' : s.race.tier1 === '백인/라틴' ? 'caucasian' : 'black';
                const tier2En = (RACE_TIER2[tier1key] || []).find(r => r.ko === s.race.tier2)?.en || s.race.tier2;
                raceDesc = `${tier2En} features`;
            }
            const tier3En = s.race.tier3 ? ((RACE_TIER3[s.race.tier2] || []).find(p => p.ko === s.race.tier3)?.en || '') : '';

            // 눈 색상 — 미선택 시 생략
            const eyeDesc = s.eyeColor ? (EYE_COLORS.find(e => e.ko === s.eyeColor)?.en || '') : '';
            const bustDesc = isFemale && s.bustSize ? (BUST_SIZES.find(b => b.ko === s.bustSize)?.en || '') : '';

            // 신체 지표 — touched 시만 반영
            const hDesc = s.heightTouched ? (s.height < 160 ? 'petite short-statured' : s.height < 170 ? 'average height' : s.height < 180 ? 'tall lean-framed' : s.height < 190 ? 'athletic tall' : 'towering imposing') : '';
            const hTag = s.heightTouched ? `${hDesc} ${s.height}cm` : '';
            const fDesc = s.bodyFatTouched ? (s.bodyFat <= 8 ? 'competition-shredded' : s.bodyFat <= 12 ? 'athletic lean' : s.bodyFat <= 18 ? 'fit healthy' : s.bodyFat <= 25 ? 'average body composition' : 'heavyset athletic') : '';
            const fTag = s.bodyFatTouched ? `${fDesc} ${s.bodyFat}% body fat` : '';
            const mDesc = s.muscleTouched ? (s.muscle >= 90 ? 'hyper-muscular' : s.muscle >= 75 ? 'well-defined musculature' : s.muscle >= 55 ? 'toned athletic' : s.muscle >= 35 ? 'lean average muscle' : 'slim ectomorphic') : '';

            // 신체 비율 — touched + 극단값만
            const hr = s.headSize / 100;
            const headKw = s.headSizeTouched ? (hr >= 1.1 ? (hr >= 1.8 ? 'extremely oversized chibi head proportion' : hr >= 1.4 ? 'oversized stylized head proportion' : 'large expressive head proportion') : hr <= 0.75 ? '8-head-body proportion, small head' : '') : '';
            const legKw = s.torsoLegTouched ? (s.torsoLeg < 35 ? 'long torso short legs proportions' : s.torsoLeg > 65 ? 'long legs shorter torso proportions' : '') : '';
            const shKw = s.shoulderTouched ? (s.shoulder / 100 < 0.75 ? 'narrow sloped shoulders' : s.shoulder / 100 > 1.3 ? 'extremely wide V-taper shoulders' : s.shoulder / 100 > 1.1 ? 'broad powerful shoulders' : '') : '';
            const roundnessDesc = s.roundnessTouched ? (s.roundness > 70 ? 'soft round facial features' : s.roundness < 30 ? 'sharp angular facial definition' : '') : '';

            // 얼굴 — 미선택 시 생략
            const faceDesc = s.faceShape ? (FACE_PROMPTS[s.faceShape] || s.faceShape) : '';
            const foreDesc = s.foreheadShape ? (FOREHEAD_PROMPTS[s.foreheadShape] || s.foreheadShape) : '';

            // 피부 — 빈 배열이면 생략
            const skinTexArr = Array.isArray(s.skinTexture) ? s.skinTexture : (s.skinTexture ? [s.skinTexture] : []);
            const skinParts = skinTexArr.flatMap(t => {
                if (t === '초사실적 피부') return ['natural skin texture', 'natural skin shine', 'real visible pores'];
                return [SKIN_TEX_PROMPTS[t] || t];
            });
            const skinDesc = skinParts.join(', ');

            // 헤어 — 미선택 시 생략
            const hairDesc = s.hairStyle ? (HAIR_PROMPTS[s.hairStyle] || s.hairStyle) : '';
            const hairColorEn = s.hairColor ? ((HAIR_COLORS.find(c => c.ko === s.hairColor)?.en) || s.hairColor) : '';
            const hairFullDesc = [hairColorEn, hairDesc].filter(Boolean).join(', ');

            // 눈매/눈썹/코/입 — 미선택 시 생략
            const eyeShapeDesc = s.eyeShape ? (EYE_SHAPE_PROMPTS[s.eyeShape] || '') : '';
            const eyebrowDesc = s.eyebrowShape ? (EYEBROW_PROMPTS[s.eyebrowShape] || '') : '';
            const noseDesc = s.noseShape ? (NOSE_PROMPTS[s.noseShape] || '') : '';
            const lipDesc = s.lipShape ? (LIP_PROMPTS[s.lipShape] || '') : '';
            const faceDetailDesc = [eyeShapeDesc, eyebrowDesc, noseDesc, lipDesc].filter(Boolean).join(', ');

            // 성격 / 음성
            const persEn = s.personality.map(ko => {
                for (const g of PERSONALITY_GROUPS) { const c = g.chips.find(c => c.ko === ko); if (c) return c.en; }
                return ko;
            });
            const personalityDesc = persEn.length ? `Personality: ${persEn.join(', ')}.` : '';
            const voiceEn = s.voice.map(ko => {
                for (const g of VOICE_GROUPS) { const c = g.chips.find(c => c.ko === ko); if (c) return c.en; }
                return ko;
            });
            const voiceDesc = voiceEn.length ? `Voice: ${voiceEn.join(', ')}.` : '';

            // 의상
            let attireDesc = '';
            const att = s.attire;
            if (att.tier1 === '나라별' && att.tier3) attireDesc = OUTFIT_COUNTRY_PROMPTS[att.tier3] || att.tier3;
            else if (att.tier1 === '직업별' && att.tier3) attireDesc = OUTFIT_JOB.find(x => x.ko === att.tier3)?.en || att.tier3;
            else if (att.tier1 === '스포츠별' && att.tier3) attireDesc = OUTFIT_SPORTS.find(x => x.ko === att.tier3)?.en || att.tier3;
            else if (att.tier1 === '서브컬처별' && att.tier3) attireDesc = OUTFIT_SUBCULTURE.find(x => x.ko === att.tier3)?.en || att.tier3;
            else if (att.tier1 === '상황/TPO별' && att.tier3) attireDesc = OUTFIT_TPO.find(x => x.ko === att.tier3)?.en || att.tier3;
            else if (att.tier1 === '계절별' && att.tier3) attireDesc = OUTFIT_SEASON.find(x => x.ko === att.tier3)?.en || att.tier3;
            else if (att.tier1 === '판타지/장르별' && att.tier3) attireDesc = OUTFIT_FANTASY.find(x => x.ko === att.tier3)?.en || att.tier3;
            else if (att.tier1 === '브랜드 스타일별' && att.tier3) attireDesc = OUTFIT_BRANDSTYLE.find(x => x.ko === att.tier3)?.en || att.tier3;
            const shoeDesc = att.shoes ? (OUTFIT_SHOE_PROMPTS[att.shoes] || att.shoes) : '';
            const accDesc = (att.accessories || []).map(a => OUTFIT_ACC_PROMPTS[a] || a).filter(Boolean).join(', ');
            const extraDesc = (att.extra || '').trim();
            const wearParts = [attireDesc, shoeDesc, accDesc, extraDesc].filter(Boolean).join(', ');
            const wearingTag = wearParts ? `Wearing ${wearParts}.` : '';

            // ④ 출력 구조 강제 고정 — [SUBJECT] 블록
            const nameTag = s.name.trim() ? `Character: ${s.name.trim().toUpperCase()}. ` : '';
            const subjectParts = [
                `${s.age}-year-old ${ageEntry[3]}`, gd.en,
                tier3En, raceDesc, bustDesc,
                eyeDesc, hairFullDesc,
                hTag, fTag, mDesc,
                headKw, legKw, shKw,
                faceDesc, foreDesc, roundnessDesc, faceDetailDesc,
                skinDesc, s.bodyExtra.trim()
            ].filter(Boolean).join(', ');
            const traitsParts = [personalityDesc, voiceDesc, wearingTag].filter(Boolean).join(' ');
            return `${nameTag}[SUBJECT] ${subjectParts}.${traitsParts ? ' ' + traitsParts : ''}`.replace(/\s+/g, ' ').trim();
        }

        function buildStageSection() {
            const s = state;
            let stageSection = '';
            if (s.stageMode === 'location') {
                const locEn = STAGE_LOCATIONS.find(x => x.ko === s.location)?.en || s.location;
                const atmoEn = STAGE_ATMOSPHERES.find(x => x.ko === s.atmosphere)?.en || s.atmosphere;
                stageSection = `Location: ${locEn}. Weather/Atmosphere: ${atmoEn}.`;
            } else {
                const setEn = STAGE_SET_DESIGNS.find(x => x.ko === s.setDesign)?.en || s.setDesign;
                const matEn = STAGE_SET_MATS.find(x => x.ko === s.stageMat)?.en || s.stageMat;
                stageSection = `Built Set: ${setEn}. Surface Materials: ${matEn}.`;
            }
            const propArr = s.props.join(', ');
            const pExtra = s.propExtra.trim() ? `, ${s.propExtra.trim()}` : '';
            if (propArr || pExtra) stageSection += ` Props visible: ${propArr}${pExtra}.`;
            const stageLighting = LIGHTING_PROMPTS?.[seqState?.lighting] || '';
            const stageParticles = PARTICLE_PROMPTS?.[seqState?.particle] || '';
            if (stageLighting) stageSection += ` Lighting: ${stageLighting}.`;
            if (stageParticles) stageSection += ` Particles: ${stageParticles}.`;
            return stageSection.replace(/\s+/g, ' ').trim();
        }

        function generateCharacterStagePrompt() {
            const charSection = buildCharacterSection() + ' ' + SUBJECT_STABILITY_RULE + '.';
            const stageSection = buildStageSection();
            let renderTags = `8k resolution, photorealistic, cinematic lighting, ray-traced reflections, highly detailed, sharp focus, Unreal Engine 5.2 render`;
            const skinTexList = Array.isArray(state.skinTexture) ? state.skinTexture : (state.skinTexture ? [state.skinTexture] : []);
            if (skinTexList.includes('유분기(물광)') || skinTexList.includes('땀방울')) renderTags += `, specular highlights on skin`;
            let prompt = '';
            if (state.view === 'character') {
                prompt = `A hyper-realistic 8K cinematic character reference sheet, ${OUTPUT_FRAME_DATA[state.charSheetFrame].imagePrompt}, white background, multiple views showing: front full body, back full body, face close-up, side profile, 3/4 angle, upper body detail. ${charSection} ${renderTags}`;
            } else {
                prompt = `A hyper-realistic 8K cinematic establishing shot, ${OUTPUT_FRAME_DATA[state.outputFrame].imagePrompt}. ${charSection} [ENVIRONMENT] ${stageSection} ${renderTags}`;
            }
            return appendConstraints(prompt);
        }
