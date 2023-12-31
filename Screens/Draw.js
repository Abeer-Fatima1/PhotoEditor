/*import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, FlatList } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const colorData = [
  'red',
  'green',
  'blue',
  'orange',
  'purple',
  'pink',
  'black',
  'yellow',
];

export default function Draw() {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedColor, setSelectedColor] = useState('red');
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);

  const onTouchMove = (event) => {
    const newPath = [...currentPath];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;
    const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };

  const onTouchEnd = () => {
    setPaths([...paths, { path: currentPath, color: selectedColor }]);
    setCurrentPath([]);
    setClearButtonClicked(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath([]);
    setClearButtonClicked(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={colorData}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.colorItem, { backgroundColor: item }]}
            onPress={() => handleColorSelect(item)}
          />
        )}
      />
      <View style={styles.svgContainer} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <Svg height={height * 0.7} width={width}>
          <Path
            d={paths.map((item) => item.path).join('')}
            stroke={isClearButtonClicked ? 'transparent' : 'black'}
            fill={'transparent'}
            strokeWidth={3}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          />
          {paths.length > 0 &&
            paths.map((item, index) => (
              <Path
                key={`path-${index}`}
                d={item.path.join('')}
                stroke={isClearButtonClicked ? 'transparent' : item.color}
                fill={'transparent'}
                strokeWidth={2}
                strokeLinejoin={'round'}
                strokeLinecap={'round'}
              />
            ))}
        </Svg>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    height: height * 0.7,
    width,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
});
import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Image, PanResponder, FlatList, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const COLORS = ['black', 'red', 'blue', 'green']; // Add more colors if needed
const SIZES = [3, 5, 7, 10]; // Add more sizes if needed
const ERASER_SIZES = [10, 20, 30, 40]; // Sizes for erasers

export default function Draw({ route, navigation }) {
  const { uri } = route.params;

  const [drawingPaths, setDrawingPaths] = useState([]);
  const currentPath = useRef([]);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState(5);
  const [isEraserMode, setIsEraserMode] = useState(false);

  const updateDrawingPaths = useCallback(() => {
    setDrawingPaths([...drawingPaths, { path: currentPath.current, color: selectedColor, size: selectedSize }]);
  }, [drawingPaths, selectedColor, selectedSize]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // Start a new drawing session
      currentPath.current = [];
    },
    onPanResponderMove: (event, gesture) => {
      currentPath.current.push({
        x: gesture.moveX,
        y: gesture.moveY - 100,
      });
      updateDrawingPaths();
    },
    onPanResponderRelease: () => {
      // Handle release if needed
    },
  });

  const renderColorItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.colorItem, { backgroundColor: item, borderWidth: selectedColor === item ? 2 : 0 }]}
      onPress={() => {
        setSelectedColor(item);
        setIsEraserMode(false);
      }}
    />
  );

  const renderSizeItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.sizeItem,
        { borderColor: isEraserMode ? 'transparent' : selectedSize === item ? 'black' : 'transparent' },
      ]}
      onPress={() => setSelectedSize(item)}
    >
      <View style={[styles.sizeIndicator, { width: item, height: item }]} />
    </TouchableOpacity>
  );

  const renderEraserItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.eraserItem,
        { borderColor: isEraserMode ? selectedSize === item ? 'black' : 'transparent' : 'transparent' },
      ]}
      onPress={() => {
        setSelectedSize(item);
        setIsEraserMode(true);
      }}
    >
      <View style={[styles.eraserIndicator, { width: item, height: item }]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={styles.backgroundImage} />

      <View style={styles.drawingContainer} {...panResponder.panHandlers}>
        <Svg height="100%" width="100%">
          {drawingPaths.map((item, index) => (
            <Path
              key={`path-${index}`}
              d={item.path?.length > 0 ? `M${item.path.map((point) => `${point.x},${point.y}`).join(' ')}` : ''}
              stroke={isEraserMode ? 'white' : item.color}
              strokeWidth={isEraserMode ? item.size : selectedSize}
              fill="transparent"
            />
          ))}
        </Svg>
      </View>

      <View style={styles.controlsContainer}>
        <FlatList data={COLORS} horizontal renderItem={renderColorItem} keyExtractor={(item) => item} />

        <FlatList data={SIZES} horizontal renderItem={renderSizeItem} keyExtractor={(item) => item.toString()} />

        <FlatList data={ERASER_SIZES} horizontal renderItem={renderEraserItem} keyExtractor={(item) => item.toString()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawingContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  colorItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  sizeItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  sizeIndicator: {
    borderRadius: 50,
    backgroundColor: 'black',
  },
  eraserItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  eraserIndicator: {
    borderRadius: 50,
    backgroundColor: 'black',
  },
});*/
import {
  Canvas,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from "@shopify/react-native-skia";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Colors = ["black", "red", "blue", "green", "yellow", "white"];
const strokes = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

const Draw = () => {
  const [paths, setPaths] = useState([]);
  const [color, setColor] = useState(Colors[0]);
  const [strokeWidth, setStrokeWidth] = useState(strokes[0]);

  const onDrawingStart = useCallback((touchInfo) => {
    setPaths((currentPaths) => {
      const { x, y } = touchInfo;
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      return [
        ...currentPaths,
        {
          path: newPath,
          color,
          strokeWidth,
        },
      ];
    });
  }, [color, strokeWidth]);

  const onDrawingActive = useCallback((touchInfo) => {
    setPaths((currentPaths) => {
      const { x, y } = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.path.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
    },
    [onDrawingActive, onDrawingStart]
  );

  return (
    <View style={style.container}>
      <Toolbar
        color={color}
        strokeWidth={strokeWidth}
        setColor={setColor}
        setStrokeWidth={setStrokeWidth}
      />
      <Canvas style={style.container} onTouch={touchHandler}>
        {paths.map((path, index) => (
          <Path
            key={index}
            path={path.path}
            color={path.color}
            style={"stroke"}
            strokeWidth={path.strokeWidth}
          />
        ))}
      </Canvas>
    </View>
  );
};

const Toolbar = ({
  color,
  strokeWidth,
  setColor,
  setStrokeWidth,
}) => {
  const [showStrokes, setShowStrokes] = useState(false);

  const handleStrokeWidthChange = (stroke) => {
    setStrokeWidth(stroke);
    setShowStrokes(false);
  };

  const handleChangeColor = (color) => {
    setColor(color);
  };

  return (
    <>
      {showStrokes && (
        <View style={[style.toolbar, style.strokeToolbar]}>
          {strokes.map((stroke) => (
            <Pressable
              onPress={() => handleStrokeWidthChange(stroke)}
              key={stroke}
            >
              <Text style={style.strokeOption}>{stroke}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <View style={[style.toolbar]}>
        <Pressable
          style={style.currentStroke}
          onPress={() => setShowStrokes(!showStrokes)}
        >
          <Text>{strokeWidth}</Text>
        </Pressable>
        <View style={style.separator} />
        {Colors.map((item) => (
          <ColorButton
            isSelected={item === color}
            key={item}
            color={item}
            onPress={() => handleChangeColor(item)}
          />
        ))}
      </View>
    </>
  );
};

const ColorButton = ({ color, onPress, isSelected }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        style.colorButton,
        { backgroundColor: color },
        isSelected && {
          borderWidth: 2,
          borderColor: "black",
        },
      ]}
    />
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  strokeOption: {
    fontSize: 18,
    backgroundColor: "#f7f7f7",
  },
  toolbar: {
    backgroundColor: "#ffffff",
    height: 50,
    width: 300,
    borderRadius: 100,
    borderColor: "#f0f0f0",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  separator: {
    height: 30,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginHorizontal: 10,
  },
  currentStroke: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
  },
  strokeToolbar: {
    position: "absolute",
    top: 70,
    justifyContent: "space-between",
    zIndex: 100,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginHorizontal: 5,
  },
});

export default Draw;
