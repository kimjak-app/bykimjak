function generateImagePrompt() {
            const frame = OUTPUT_FRAME_DATA[state.outputFrame];
            const renderTags = '8k resolution, photorealistic, cinematic lighting, ray-traced reflections, highly detailed, sharp focus';

            // 고정 항목
            const frameTag = `Frame: ${frame.imagePrompt}.`;

            // 캐릭터 연동 토글
            const charSection = state.imageUseCharacter
                ? buildCharacterSection() + ' ' + SUBJECT_STABILITY_RULE + '.'
                : '';

            // SUBJECT
            const imageSubject = state.imageSubject.trim();

            // LOCATION
            const locationEn = state.imageLocationTier3 ? (LOCATION_PROMPTS[state.imageLocationTier3] || '') : '';

            // ATMOSPHERE
            const atmosArr = Array.isArray(state.imageAtmosphere) ? state.imageAtmosphere : (state.imageAtmosphere ? [state.imageAtmosphere] : []);
            const atmosEn = atmosArr.map(a => ATMOSPHERE_ITEMS.find(x => x.ko === a)?.en || a).filter(Boolean).join(', ');

            // 색감/톤
            const colorToneEn = state.imageColorTone ? (COLOR_TONES.find(c => c.ko === state.imageColorTone)?.en || '') : '';

            // 선택 항목
            const composition = state.imageComposition ? (IMAGE_COMPOSITION_DATA[state.imageComposition] || '') : '';
            const mood = state.imageMood ? (IMAGE_MOOD_DATA[state.imageMood] || '') : '';
            const style = state.imageStyle ? (IMAGE_STYLE_DATA[state.imageStyle] || '') : '';
            const lighting = state.imageLighting ? (IMAGE_LIGHTING_DATA[state.imageLighting] || '') : '';
            const lens = state.imageLens || '';
            const aperture = state.imageAperture || '';
            const cameraSide = state.imageCameraSide || '';
            const cameraHeight = state.imageCameraHeight || '';
            const cameraTilt = state.imageCameraTilt || '';
            const distortion = (state.imageLensDistortion && state.imageLensDistortion !== 'none') ? state.imageLensDistortion : '';

            const cameraPosParts = [cameraSide, cameraHeight, cameraTilt].filter(Boolean);
            const cameraPosTag = cameraPosParts.length ? `[CAMERA POSITION] ${cameraPosParts.join(', ')}.` : '';
            const cameraSpecParts = [lens, aperture].filter(Boolean);
            const cameraSpecTag = cameraSpecParts.length ? `[LENS] ${cameraSpecParts.join(', ')}.` : '';

            const blocks = [
                'A premium still image prompt.',
                frameTag,
                charSection ? `[SUBJECT] ${charSection}` : '',
                imageSubject ? `[IMAGE SUBJECT] ${imageSubject}.` : '',
                composition ? `[COMPOSITION] ${composition}.` : '',
                locationEn ? `[LOCATION] ${locationEn}.` : '',
                atmosEn ? `[ATMOSPHERE] ${atmosEn}.` : '',
                mood ? `[MOOD] ${mood}.` : '',
                style ? `[STYLE] ${style}.` : '',
                lighting ? `[LIGHTING] ${lighting}.` : '',
                colorToneEn ? `[COLOR TONE] ${colorToneEn}.` : '',
                cameraSpecTag,
                cameraPosTag,
                distortion ? `[LENS DISTORTION] ${distortion}.` : '',
                renderTags,
                'High-end image generation only, no sequence logic, no BPM, no shot list, no motion instructions.'
            ].filter(Boolean);

            return appendConstraints(blocks.join(' '));
        }
